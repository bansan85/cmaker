import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectProjectNameIncludeVariableModel } from '../models/cmake-project-project-name-include-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: null,
})
export class CMakeProjectProjectNameIncludeVariableService extends CMakeFeatureInterface<CMakeProjectProjectNameIncludeVariableModel> {
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private rustBackendService = inject(RustBackendService);
  private dataToCMake = inject(DataToCMakeService);

  cmakeMinVersion: Version | null = null;

  isEnabled(action: CMakeProjectProjectNameIncludeVariableModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(
    action: CMakeProjectProjectNameIncludeVariableModel
  ): Promise<boolean> {
    return (
      this.dataToCMake.isValidTargetName(action.projectName) &&
      action.value.length > 0 &&
      this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      )
    );
  }

  protected cmakeRequiredVersionImpl(
    action: CMakeProjectProjectNameIncludeVariableModel
  ): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: CMakeProjectProjectNameIncludeVariableModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: `CMAKE_PROJECT_${action.projectName}_INCLUDE`,
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(
    action: CMakeProjectProjectNameIncludeVariableModel
  ): string {
    return `set(CMAKE_PROJECT_${
      action.projectName
    }_INCLUDE "${action.value.join(';')}")\n`;
  }
}
