import { inject, Injectable } from "@angular/core";
import { ProjectLicenseOption } from "../components/project-license-option";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Injectable({
  providedIn: null,
})
export class ProjectLicenseService
  implements CMakeFeatureInterface<ProjectLicenseOption> {
  private projectContext = inject(ProjectContextService);

  cmakeMinVersion: Version = new Version("4.2");

  cmakeRequiredVersion(license: ProjectLicenseOption): Version | null {
    if (
      license.enabledLicense &&
      !license.service.cmakeMinVersion.isGreater(
        this.projectContext.version
      )
    ) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(license: ProjectLicenseOption): CMakeAvailableData {
    if (
      license.enabledLicense &&
      !license.service.cmakeMinVersion.isGreater(
        this.projectContext.version
      )
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

  toCMakeListTxt(license: ProjectLicenseOption): string {
    if (
      license.enabledLicense &&
      !license.service.cmakeMinVersion.isGreater(
        this.projectContext.version
      )
    ) {
      return `SPDX_LICENSE "${license.license}"`;
    } else {
      return "";
    }
  }
}
