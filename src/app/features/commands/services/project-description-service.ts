import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { ProjectDescriptionArgument } from '../components/project-description-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: null
})
export class ProjectDescriptionService implements CMakeFeatureInterface<ProjectDescriptionArgument> {
  private projectContext = inject(ProjectContextService);

  cmakeMinVersion: Version = new Version(3, 9);

  cmakeRequiredVersion(action: ProjectDescriptionArgument): Version {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return this.cmakeMinVersion;
    } else {
      return new Version(3);
    }
  }

  cmakeObjects(action: ProjectDescriptionArgument): CMakeAvailableData {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return {
        variables: [
          {
            name: "PROJECT_DESCRIPTION",
            version: new Version(3, 9),
          },
          {
            name: "<PROJECT-NAME>_DESCRIPTION",
            version: new Version(3, 12),
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectDescriptionArgument): string {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return `DESCRIPTION "${action.value}"`;
    } else {
      return "";
    }
  }
}
