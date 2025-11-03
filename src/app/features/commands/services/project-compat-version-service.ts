import { Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectCompatVersionArgument } from "../components/project-compat-version-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";

@Injectable({
  providedIn: null,
})
export class ProjectCompatVersionService
  implements CMakeFeatureInterface<ProjectCompatVersionArgument>
{
  cmakeMinVersion: Version = new Version(4, 1);

  cmakeRequiredVersion(action: ProjectCompatVersionArgument): Version {
    if (action.enabled) {
      return this.cmakeMinVersion;
    } else {
      return new Version(3);
    }
  }

  cmakeObjects(action: ProjectCompatVersionArgument): CMakeAvailableData {
    if (action.enabled) {
      return {
        variables: [
          {
            name: "PROJECT_COMPAT_VERSION",
            version: this.cmakeMinVersion,
          },
          {
            name: "<PROJECT-NAME>_COMPAT_VERSION",
            version: this.cmakeMinVersion,
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectCompatVersionArgument): string {
    if (action.enabled && action.value) {
      return `COMPAT_VERSION ${action.value.toString()}`;
    } else {
      return "";
    }
  }
}
