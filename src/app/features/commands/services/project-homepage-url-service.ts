import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { ProjectHomepageUrlArgument } from '../components/project-homepage-url-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';

@Injectable({
  providedIn: null
})
export class ProjectHomepageUrlService implements CMakeFeatureInterface<ProjectHomepageUrlArgument> {
  private projectContext = inject(ProjectContextService);

  cmakeMinVersion: Version = new Version(3, 12);

  cmakeRequiredVersion(action: ProjectHomepageUrlArgument): Version {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return this.cmakeMinVersion;
    } else {
      return new Version(3);
    }
  }

  cmakeObjects(action: ProjectHomepageUrlArgument): CMakeAvailableData {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return {
        variables: [
          {
            name: "PROJECT_HOMEPAGE_URL",
            version: this.cmakeMinVersion,
          },
          {
            name: "<PROJECT-NAME>_HOMEPAGE_URL",
            version: this.cmakeMinVersion,
          },
          {
            name: "CMAKE_PROJECT_HOMEPAGE_URL",
            version: this.cmakeMinVersion,
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectHomepageUrlArgument): string {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return `HOMEPAGE_URL "${action.value}"`;
    } else {
      return "";
    }
  }
}
