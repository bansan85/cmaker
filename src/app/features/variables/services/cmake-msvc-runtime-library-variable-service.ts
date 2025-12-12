import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputCheckboxModel } from '../../../shared/models/arguments/input-checkbox-model';

@Injectable({
  providedIn: null,
})
export class CMakeMsvcRuntimeLibraryVariableService extends CMakeFeatureInterface<InputCheckboxModel> {
  private readonly variable = 'CMAKE_MSVC_RUNTIME_LIBRARY';
  private readonly helpText = 'Build using CRT shared libraries';

  readonly cmakeMinVersion = new Version(3, 15);

  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputCheckboxModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: InputCheckboxModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputCheckboxModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(action: InputCheckboxModel): CMakeAvailableData {
    return {
      options: [
        {
          variable: this.variable,
          helpText: this.helpText,
          value: this.dataToCMake.booleanToString(action.value),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputCheckboxModel): Promise<string> {
    return Promise.resolve(`# Windows only
option(${this.variable} "${this.helpText}" ${this.dataToCMake.booleanToString(
      action.value
    )})

if(NOT ${this.variable})
  cmake_policy(SET CMP0091 NEW)
  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()
`);
  }

  toCMakerTxt(action: InputCheckboxModel): string {
    return `cmaker_cmake_msvc_runtime_library(${this.dataToCMake.booleanToString(
      action.value
    )})\n`;
  }
}
