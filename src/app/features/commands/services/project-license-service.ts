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

  isValid(action: ProjectLicenseArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  cmakeRequiredVersion(action: ProjectLicenseArgument): Version | null {
    if (this.isValid(action)) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectLicenseArgument): CMakeAvailableData {
    if (this.isValid(action)) {
      return {
        variables: [
          {
            name: "PROJECT_SPDX_LICENSE",
            version: this.cmakeMinVersion,
          },
          {
            name: "<PROJECT-NAME>_SPDX_LICENSE",
            version: this.cmakeMinVersion,
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectLicenseArgument): string {
    if (this.isValid(action)) {
      return `SPDX_LICENSE "${action.value}"\n`;
    } else {
      return "";
    }
  }
}
