import { inject, Injectable } from "@angular/core";
import { ProjectLicenseArgument } from "../components/project-license-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";

@Injectable({
  providedIn: null,
})
export class ProjectLicenseService
  implements CMakeFeatureInterface<ProjectLicenseArgument>
{
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(4, 2);

  cmakeRequiredVersion(action: ProjectLicenseArgument): Version | null {
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

  cmakeObjects(action: ProjectLicenseArgument): CMakeAvailableData {
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
            name: "PROJECT_SPDX_LICENSE",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_SPDX_LICENSE",
            version: null,
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectLicenseArgument): string {
    if (
      action.enabled &&
      !this.versionService.isGreater(
        action.service.cmakeMinVersion,
        this.projectContext.version
      )
    ) {
      return `SPDX_LICENSE "${action.value}"`;
    } else {
      return "";
    }
  }
}
