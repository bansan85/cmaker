import { inject, Injectable } from "@angular/core";
import { Version } from "../../../shared/models/version";
import { ProjectMsvcRuntime } from "../components/project-msvc-runtime";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { CMakeObjects } from "../models/cmake-objects";
import { DataToCMakeService } from "./data-to-cmake-service";

@Injectable({
  providedIn: "root",
})
export class ProjectMsvcRuntimeService
  implements CMakeFeatureInterface<ProjectMsvcRuntime>
{
  private readonly variable = "CRT_SHARED_LIBS";
  private readonly helpText = "Build using CRT shared libraries";

  private dataToCMake = inject(DataToCMakeService);

  cmakeMinVersion(action: ProjectMsvcRuntime): Version | null {
    if (action.enabled) {
      return new Version("3.15");
    } else {
      return null;
    }
  }
  cmakeObjects(action: ProjectMsvcRuntime): CMakeObjects {
    if (action.enabled) {
      return {
        options: [
          {
            variable: this.variable,
            helpText: this.helpText,
            value: this.dataToCMake.booleanToString(action.defaultValue),
          },
        ],
      };
    } else {
      return {};
    }
  }
  toCMakeListTxt(action: ProjectMsvcRuntime): string {
    if (action.enabled) {
      return `# Windows only
option(${this.variable} "${this.helpText}" ${this.dataToCMake.booleanToString(
        action.defaultValue
      )})

if(NOT ${this.variable})
  cmake_policy(SET CMP0091 NEW)
  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()
`;
    } else {
      return "";
    }
  }
}
