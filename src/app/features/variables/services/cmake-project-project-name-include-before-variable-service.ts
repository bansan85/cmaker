import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { Version } from '../../../shared/models/version';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { InputProjectNameFilesModel } from '../../../shared/models/arguments/input-project-name-files-model';

@Injectable({
  providedIn: null,
})
export class CMakeProjectProjectNameIncludeBeforeVariableService extends CMakeFeatureInterface<InputProjectNameFilesModel> {
  readonly cmakeMinVersion = new Version(3, 17);

  private rustBackendService = inject(RustBackendService);
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputProjectNameFilesModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(action: InputProjectNameFilesModel): Promise<boolean> {
    return (
      this.dataToCMake.isValidTargetName(action.projectName) &&
      action.value.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      ))
    );
  }

  protected cmakeRequiredVersionImpl(
    action: InputProjectNameFilesModel
  ): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: InputProjectNameFilesModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: `CMAKE_PROJECT_${action.projectName}_INCLUDE_BEFORE`,
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(
    action: InputProjectNameFilesModel
  ): Promise<string> {
    return Promise.resolve(
      `set(CMAKE_PROJECT_${
        action.projectName
      }_INCLUDE_BEFORE "${action.value.join(';')}")\n`
    );
  }
}
