import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectCompatVersionService extends CMakeArgumentInterface<InputVersionModel> {
  readonly cmakeMinVersion = new Version(4, 1);

  isEnabled(action: InputVersionModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  isValid(action: InputVersionModel): Promise<boolean> {
    return Promise.resolve(action.version !== undefined);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputVersionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputVersionModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
        {
          name: '<PROJECT-NAME>_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
        {
          name: 'CMAKE_PROJECT_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputVersionModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputVersionModel): string {
    return `COMPAT_VERSION ${action.version?.toString()}\n`;
  }
}
