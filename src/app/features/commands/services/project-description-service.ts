import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectDescriptionArgument } from "../components/project-description-argument";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { VersionService } from "../../../shared/services/version-service";

@Injectable({
  providedIn: null,
})
export class ProjectDescriptionService
  implements CMakeFeatureInterface<ProjectDescriptionArgument>
{
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(3, 9);

  cmakeRequiredVersion(action: ProjectDescriptionArgument): Version | null {
    if (
      action.enabled &&
      !this.versionService.isGreater(
        action.service.cmakeMinVersion,
        this.projectContext.version
      )
    ) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectDescriptionArgument): CMakeAvailableData {
    if (
      action.enabled &&
      !this.versionService.isGreater(
        action.service.cmakeMinVersion,
        this.projectContext.version
      )
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
      !this.versionService.isGreater(
        action.service.cmakeMinVersion,
        this.projectContext.version
      )
    ) {
      return `DESCRIPTION "${action.value}"`;
    } else {
      return "";
    }
  }
}
