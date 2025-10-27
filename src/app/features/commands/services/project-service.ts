import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCommand } from "../components/project-command";
import { CMakeAvailableData } from "../models/cmake-available-data";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  private readonly variable = "CRT_SHARED_LIBS";
  private readonly helpText = "Build using CRT shared libraries";

  projectContext = inject(ProjectContextService);

  cmakeMinVersion(action: ProjectCommand): Version | null {
    console.log(this.projectContext.version);
    if (action.enabledLicense) {
      return new Version("4.2");
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
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

  toCMakeListTxt(action: ProjectCommand): string {
    if (action.enabledLicense) {
      return `SPDX_LICENSE "${action.license}"`;
    } else {
      return "";
    }
  }
}
