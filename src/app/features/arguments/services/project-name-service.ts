import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { Version } from '../../../shared/models/version';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';

@Injectable({
  providedIn: 'root',
})
export class ProjectNameService extends CMakeFeatureInterface<InputStringModel> {
  readonly cmakeMinVersion = null;

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputStringModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: InputStringModel): Promise<boolean> {
    return Promise.resolve(this.dataToCMake.isValidTargetName(action.value));
  }

  protected cmakeRequiredVersionImpl(
    _action: InputStringModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputStringModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_NAME',
          version: null,
        },
        {
          name: 'CMAKE_PROJECT_NAME',
          version: null,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputStringModel): string {
    return `${action.value}\n`;
  }
}
