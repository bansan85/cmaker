import { Injectable } from "@angular/core";
import { ProjectLicenseOption } from "../components/project-license-option";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../models/cmake-available-data";

@Injectable({
  providedIn: null,
})
export class ProjectLicenseService {
  cmakeMinVersion(license: ProjectLicenseOption):Version|null {
    if (license.enabledLicense) {
      return new Version("4.2");
    } else {
      return null;
    }
  }

  cmakeObjects(license: ProjectLicenseOption): CMakeAvailableData {
    if (license.enabledLicense) {
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
    if (license.enabledLicense) {
      return `SPDX_LICENSE "${license.license}"`;
    } else {
      return "";
    }
  }
}
