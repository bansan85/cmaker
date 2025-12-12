import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectSpdxLicenseService extends CMakeArgumentInterface<InputStringModel> {
  readonly cmakeMinVersion = new Version(4, 2);

  isEnabled(action: InputStringModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: InputStringModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputStringModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputStringModel): CMakeAvailableData {
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

  protected toCMakeListTxtImpl(action: InputStringModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputStringModel): string {
    return `SPDX_LICENSE "${action.value}"\n`;
  }
}
