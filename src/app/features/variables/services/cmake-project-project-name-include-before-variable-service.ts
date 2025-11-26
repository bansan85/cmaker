import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectProjectNameIncludeBeforeVariableModel } from '../models/cmake-project-project-name-include-before-variable.model';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';

@Injectable({
  providedIn: null,
})
export class CMakeProjectProjectNameIncludeBeforeVariableService extends CMakeFeatureInterface<CMakeProjectProjectNameIncludeBeforeVariableModel> {
  readonly cmakeMinVersion = new Version(3, 17);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private rustBackendService = inject(RustBackendService);
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(
    action: CMakeProjectProjectNameIncludeBeforeVariableModel
  ): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(
    action: CMakeProjectProjectNameIncludeBeforeVariableModel
  ): Promise<boolean> {
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
    action: CMakeProjectProjectNameIncludeBeforeVariableModel
  ): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: CMakeProjectProjectNameIncludeBeforeVariableModel
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
    action: CMakeProjectProjectNameIncludeBeforeVariableModel
  ): string {
    return `set(CMAKE_PROJECT_${
      action.projectName
    }_INCLUDE_BEFORE "${action.value.join(';')}")\n`;
  }
}
