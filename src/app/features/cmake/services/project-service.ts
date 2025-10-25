import { Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { Project } from "../components/project";
import { Version } from "../../../shared/models/version";
import { CMakeObjects } from "../models/cmake-objects";

@Injectable({
  providedIn: "root",
})
export class ProjectService implements CMakeFeatureInterface<Project> {
  private readonly variable = "CRT_SHARED_LIBS";
  private readonly helpText = "Build using CRT shared libraries";

  cmakeMinVersion(action: Project): Version | null {
    if (action.enabledLicense) {
      return new Version("4.2");
    } else {
      return null;
    }
  }
  cmakeObjects(action: Project): CMakeObjects {
    if (action.enabledLicense) {
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
  toCMakeListTxt(action: Project): string {
    if (action.enabledLicense) {
      return `SPDX_LICENSE "${action.license}"`;
    } else {
      return "";
    }
  }
}
