import { inject, Injectable } from '@angular/core';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../interfaces/cmake-available-data';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Injectable({
  providedIn: null,
})
export class OptionsRootPathService extends CMakeArgumentInterface<InputDirectoryModel> {
  readonly cmakeMinVersion = null;

  private rustBackendService = inject(RustBackendService);

  isEnabled(action: InputDirectoryModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.value === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.value
        ))
    );
  }

  isValid(action: InputDirectoryModel): Promise<boolean> {
    return this.rustBackendService.pathExists(action.value, true);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputDirectoryModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputDirectoryModel): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(_action: InputDirectoryModel): Promise<string> {
    throw new Error('cmaker_root_path is not serializable to CMakeLists.txt');
  }

  toCMakerTxt(action: InputDirectoryModel): string {
    return `cmaker_root_path(${action.value})\n`;
  }
}
