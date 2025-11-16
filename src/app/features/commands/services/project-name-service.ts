import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { ProjectNameArgument } from '../components/project-name-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { Version } from '../../../shared/models/version';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: 'root',
})
export class ProjectNameService extends CMakeFeatureInterface<ProjectNameArgument> {
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);
  private dataToCMake = inject(DataToCMakeService);

  cmakeMinVersion: Version | null = null;

  isEnabled(action: ProjectNameArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectNameArgument): boolean {
    return this.dataToCMake.isValidTargetName(action.name);
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectNameArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: ProjectNameArgument): CMakeAvailableData {
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

  protected toCMakeListTxtImpl(action: ProjectNameArgument): string {
    return `${action.value}\n`;
  }
}
