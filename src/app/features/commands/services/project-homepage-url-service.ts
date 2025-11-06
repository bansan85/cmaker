import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectHomepageUrlArgument } from "../components/project-homepage-url-argument";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { VersionService } from "../../../shared/services/version-service";

@Injectable({
  providedIn: null,
})
export class ProjectHomepageUrlService
  implements CMakeFeatureInterface<ProjectHomepageUrlArgument>
{
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(3, 12);

  isValid(action: ProjectHomepageUrlArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  cmakeRequiredVersion(action: ProjectHomepageUrlArgument): Version | null {
    if (this.isValid(action)) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectHomepageUrlArgument): CMakeAvailableData {
    if (this.isValid(action)) {
      return {
        variables: [
          {
            name: "PROJECT_HOMEPAGE_URL",
            version: new Version(3, 12),
          },
          {
            name: "<PROJECT-NAME>_HOMEPAGE_URL",
            version: new Version(3, 12),
          },
          {
            name: "CMAKE_PROJECT_HOMEPAGE_URL",
            version: new Version(3, 12),
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectHomepageUrlArgument): string {
    if (this.isValid(action)) {
      return `HOMEPAGE_URL "${action.value}"\n`;
    } else {
      return "";
    }
  }
}
