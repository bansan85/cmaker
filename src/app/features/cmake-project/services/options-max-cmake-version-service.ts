import { Injectable } from '@angular/core';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../interfaces/cmake-available-data';

@Injectable({
  providedIn: null,
})
export class OptionsMaxCMakeVersionService extends CMakeArgumentInterface<InputVersionModel> {
  readonly cmakeMinVersion = null;

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
