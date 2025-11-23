import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectIncludeVariableModel } from '../models/cmake-project-include-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: null,
})
export class CMakeProjectIncludeVariableService extends CMakeFeatureInterface<CMakeProjectIncludeVariableModel> {
  private readonly variable = 'CMAKE_PROJECT_INCLUDE';

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private rustBackendService = inject(RustBackendService);

  cmakeMinVersion: Version | null = new Version(3, 15);

  isEnabled(action: CMakeProjectIncludeVariableModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(action: CMakeProjectIncludeVariableModel): Promise<boolean> {
    return (
      action.value.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      ))
    );
  }

  protected cmakeRequiredVersionImpl(
    action: CMakeProjectIncludeVariableModel
  ): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: CMakeProjectIncludeVariableModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: this.variable,
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(
    action: CMakeProjectIncludeVariableModel
  ): string {
    return `set(${this.variable} "${action.value.join(';')}")\n`;
  }
}
