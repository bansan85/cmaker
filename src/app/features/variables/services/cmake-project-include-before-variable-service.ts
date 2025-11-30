import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { InputFilesModel } from '../../../shared/models/arguments/input-files-model';

@Injectable({
  providedIn: null,
})
export class CMakeProjectIncludeBeforeVariableService extends CMakeFeatureInterface<InputFilesModel> {
  private readonly variable = 'CMAKE_PROJECT_INCLUDE_BEFORE';

  readonly cmakeMinVersion = new Version(3, 15);

  private rustBackendService = inject(RustBackendService);

  isEnabled(action: InputFilesModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(action: InputFilesModel): Promise<boolean> {
    return (
      action.value.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      ))
    );
  }

  protected cmakeRequiredVersionImpl(action: InputFilesModel): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(action: InputFilesModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: this.variable,
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputFilesModel): string {
    return `set(${this.variable} "${action.value.join(';')}")\n`;
  }
}
