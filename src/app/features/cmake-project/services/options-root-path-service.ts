import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { Version } from '../../../shared/models/version';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { CMakeAvailableData } from '../interfaces/cmake-available-data';

@Injectable({
  providedIn: null,
})
export class OptionsRootPathService extends CMakeArgumentInterface<InputDirectoryModel> {
  readonly cmakeMinVersion = null;

  private readonly rustBackendService = inject(RustBackendService);

  isEnabled(action: InputDirectoryModel): boolean {
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
    (action: InputDirectoryModel): Promise<boolean> =>
      this.rustBackendService.pathExists(action.directory, true),
  ] as const;

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputDirectoryModel
    ): Promise<boolean> => this.validateArgs[0]({ directory: control.value }),
  ] as const;

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
    return `cmaker_root_path(${action.directory})\n`;
  }
}
