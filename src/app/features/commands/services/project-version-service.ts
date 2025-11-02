import { Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectVersionArgument } from "../components/project-version-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Injectable({
  providedIn: null,
})
export class ProjectVersionService
  implements CMakeFeatureInterface<ProjectVersionArgument>
{
  cmakeMinVersion: Version = new Version(3);

  cmakeRequiredVersion(action: ProjectVersionArgument): Version {
    if (action.enabled) {
      return this.cmakeMinVersion;
    } else {
      return new Version(3);
    }
  }

  cmakeObjects(action: ProjectVersionArgument): CMakeAvailableData {
    if (action.enabled) {
      return {
        variables: [
          {
            name: "PROJECT_VERSION",
            version: new Version(3),
          },
          {
            name: "<PROJECT-NAME>_VERSION",
            version: new Version(3),
          },
          {
            name: "PROJECT_VERSION_MAJOR",
            version: new Version(3),
          },
          {
            name: "<PROJECT-NAME>_VERSION_MAJOR",
            version: new Version(3),
          },
          {
            name: "PROJECT_VERSION_MINOR",
            version: new Version(3),
          },
          {
            name: "<PROJECT-NAME>_VERSION_MINOR",
            version: new Version(3),
          },
          {
            name: "PROJECT_VERSION_PATCH",
            version: new Version(3),
          },
          {
            name: "<PROJECT-NAME>_VERSION_PATCH",
            version: new Version(3),
          },
          {
            name: "PROJECT_VERSION_TWEAK",
            version: new Version(3),
          },
          {
            name: "<PROJECT-NAME>_VERSION_TWEAK",
            version: new Version(3),
          },
          {
            name: "CMAKE_VERSION_TWEAK",
            version: new Version(3, 12),
          },
        ],
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectVersionArgument): string {
    if (action.enabled && action.value) {
      return `VERSION ${action.value.toString()}`;
    } else {
      return "";
    }
  }
}
