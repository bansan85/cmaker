import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectIncludeBeforeVariableModel } from '../models/cmake-project-include-before-variable.model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Injectable({
  providedIn: null,
})
export class CMakeProjectIncludeBeforeVariableService extends CMakeFeatureInterface<CMakeProjectIncludeBeforeVariableModel> {
  private readonly variable = 'CMAKE_PROJECT_INCLUDE_BEFORE';

  readonly cmakeMinVersion = new Version(3, 15);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private rustBackendService = inject(RustBackendService);

  isEnabled(action: CMakeProjectIncludeBeforeVariableModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(
    action: CMakeProjectIncludeBeforeVariableModel
  ): Promise<boolean> {
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
    action: CMakeProjectIncludeBeforeVariableModel
  ): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: CMakeProjectIncludeBeforeVariableModel
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
    action: CMakeProjectIncludeBeforeVariableModel
  ): string {
    return `set(${this.variable} "${action.value.join(';')}")\n`;
  }
}
