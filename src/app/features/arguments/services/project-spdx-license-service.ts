import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { InputLicenseModel } from '../../../shared/models/arguments/input-license-model';

@Injectable({
  providedIn: null,
})
export class ProjectSpdxLicenseService extends CMakeArgumentInterface<InputLicenseModel> {
  readonly cmakeMinVersion = new Version(4, 2);

  isEnabled(action: InputLicenseModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  isValid(_action: InputLicenseModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputLicenseModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputLicenseModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
        {
          name: '<PROJECT-NAME>_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
        {
          name: 'CMAKE_PROJECT_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputLicenseModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputLicenseModel): string {
    return `SPDX_LICENSE "${action.license}"\n`;
  }
}
