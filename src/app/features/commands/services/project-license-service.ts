import { inject, Injectable } from "@angular/core";
import { ProjectLicenseArgument } from "../components/project-license-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Injectable({
  providedIn: null,
})
export class ProjectLicenseService
  implements CMakeFeatureInterface<ProjectLicenseArgument> {
  private projectContext = inject(ProjectContextService);

  cmakeMinVersion: Version = new Version(4, 2);

  cmakeRequiredVersion(action: ProjectLicenseArgument): Version {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return this.cmakeMinVersion;
    } else {
      return new Version(3);
    }
  }

  cmakeObjects(action: ProjectLicenseArgument): CMakeAvailableData {
    if (
      action.enabled &&
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return {
        variables: [
          {
            name: "PROJECT_SPDX_LICENSE",
          },
          {
            name: "<PROJECT-NAME>_SPDX_LICENSE",
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
      !action.service.cmakeMinVersion.isGreater(this.projectContext.version)
    ) {
      return `SPDX_LICENSE "${action.value}"`;
    } else {
      return "";
    }
  }
}
