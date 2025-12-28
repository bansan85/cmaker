import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectHomepageUrlService extends CMakeArgumentInterface<InputStringModel> {
  readonly cmakeMinVersion = new Version(3, 12);
  isEnabled(action: InputStringModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  readonly validateArgs = [
    (action: InputStringModel): Promise<boolean> =>
      Promise.resolve(/https?:\/\/.+/u.test(action.text)),
  ];

  protected cmakeRequiredVersionImpl(
    _action: InputStringModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputStringModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
        {
          name: '<PROJECT-NAME>_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputStringModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputStringModel): string {
    return `HOMEPAGE_URL "${action.text}"\n`;
  }
}
