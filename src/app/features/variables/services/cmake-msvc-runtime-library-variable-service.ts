import { inject, Injectable } from "@angular/core";
import { Version } from "../../../shared/models/version";
import { CMakeMsvcRuntimeLibraryVariable } from "../../variables/components/cmake-msvc-runtime-library-variable";
import { CMakeFeatureInterface } from "../../commands/services/cmake-feature-interface";
import { DataToCMakeService } from "../../commands/services/data-to-cmake-service";
import { CMakeAvailableData } from "../../commands/models/cmake-available-data";

@Injectable({
  providedIn: "root",
})
export class CMakeMsvcRuntimeLibraryVariableService
  implements CMakeFeatureInterface<CMakeMsvcRuntimeLibraryVariable>
{
  private readonly variable = "CRT_SHARED_LIBS";
  private readonly helpText = "Build using CRT shared libraries";

  private dataToCMake = inject(DataToCMakeService);

  cmakeMinVersion(action: CMakeMsvcRuntimeLibraryVariable): Version | null {
    if (action.enabled) {
      return new Version("3.15");
    } else {
      return null;
    }
  }
  cmakeObjects(action: CMakeMsvcRuntimeLibraryVariable): CMakeAvailableData {
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
  toCMakeListTxt(action: CMakeMsvcRuntimeLibraryVariable): string {
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
