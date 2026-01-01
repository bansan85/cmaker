import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { CMakeAvailableData } from '../interfaces/cmake-available-data';
import { DataToCMakeService } from './data-to-cmake-service';

@Injectable({
  providedIn: null,
})
export class OptionsMaxCMakeVersionService extends CMakeArgumentInterface<InputVersionModel> {
  readonly cmakeMinVersion = null;

  private dataToCMake = inject(DataToCMakeService);

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

  readonly validateArgs = [
    (action: InputVersionModel): Promise<boolean> =>
      Promise.resolve(action.version !== undefined),
  ];

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputVersionModel
    ): Promise<boolean> =>
      this.validateArgs[0]({
        version: this.dataToCMake.stringToVersion(control.value),
      }),
  ];

  protected cmakeRequiredVersionImpl(
    _action: InputVersionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputVersionModel): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(_action: InputVersionModel): Promise<string> {
    throw new Error(
      'cmaker_max_cmake_version is not serializable to CMakeLists.txt'
    );
  }

  toCMakerTxt(action: InputVersionModel): string {
    return `cmaker_max_cmake_version(${action.version?.toString()})\n`;
  }
}
