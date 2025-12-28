import { inject } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { AbstractControl } from '@angular/forms';

export abstract class CMakeFeatureInterface<Feature> {
  protected projectContext = inject(ProjectContextService);
  protected versionService = inject(VersionService);

  abstract readonly cmakeMinVersion: Version | null;
  abstract isEnabled(action: Feature): boolean;

  async isValid(action: Feature): Promise<boolean> {
    const results = await Promise.all(
      this.validateArgs.map((validate) => validate(action))
    );
    return results.every((result) => result);
  }

  abstract validateArgs: ((action: Feature) => Promise<boolean>)[];
  abstract validateArg: ((
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: AbstractControl<any, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any
  ) => Promise<boolean>)[];

  cmakeRequiredVersion(action: Feature): Version | null {
    if (this.isEnabled(action)) {
      return this.cmakeRequiredVersionImpl(action);
    } else {
      return null;
    }
  }

  protected abstract cmakeRequiredVersionImpl(action: Feature): Version | null;

  cmakeObjects(action: Feature): CMakeAvailableData {
    if (this.isEnabled(action)) {
      return this.cmakeObjectsImpl(action);
    } else {
      return {};
    }
  }

  protected abstract cmakeObjectsImpl(action: Feature): CMakeAvailableData;

  async toCMakeListTxt(action: Feature): Promise<string> {
    if (this.isEnabled(action)) {
      let retval = '';
      if (!(await this.isValid(action))) {
        retval += '# Invalid\n';
      }
      return retval + (await this.toCMakeListTxtImpl(action));
    } else {
      return Promise.resolve('');
    }
  }

  protected abstract toCMakeListTxtImpl(action: Feature): Promise<string>;

  abstract toCMakerTxt(action: Feature): string;

  isEffectiveVersionValid(action: Feature): boolean {
    return (
      this.projectContext.maxCMakeVersion.version === undefined ||
      !this.versionService.isGreater(
        this.cmakeRequiredVersionImpl(action),
        this.projectContext.maxCMakeVersion.version
      )
    );
  }
}
