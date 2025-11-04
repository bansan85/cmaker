import { Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectVersionArgument } from "../components/project-version-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";

@Injectable({
  providedIn: null,
})
export class ProjectVersionService
  implements CMakeFeatureInterface<ProjectVersionArgument>
{
  cmakeMinVersion: Version | null = null;

  cmakeRequiredVersion(action: ProjectVersionArgument): Version | null {
    if (action.enabled) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectVersionArgument): CMakeAvailableData {
    if (action.enabled) {
      return {
        variables: [
          {
            name: "PROJECT_VERSION",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION",
            version: null,
          },
          {
            name: "PROJECT_VERSION_MAJOR",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_MAJOR",
            version: null,
          },
          {
            name: "PROJECT_VERSION_MINOR",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_MINOR",
            version: null,
          },
          {
            name: "PROJECT_VERSION_PATCH",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_PATCH",
            version: null,
          },
          {
            name: "PROJECT_VERSION_TWEAK",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_TWEAK",
            version: null,
          },
          {
            name: "CMAKE_PROJECT_VERSION",
            version: new Version(3, 12),
          },
        ],
        policies: new Map<number, boolean>([[48, true]]),
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
