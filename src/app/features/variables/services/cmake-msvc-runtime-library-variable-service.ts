import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputCheckboxModel } from '../../../shared/models/arguments/input-checkbox-model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';
import { CMakeMsvcRuntimeLibraryVariable } from '../components/cmake-msvc-runtime-library-variable';

@Injectable({
  providedIn: null,
})
export class CMakeMsvcRuntimeLibraryVariableService extends CMakeCommandInterface<InputCheckboxModel> {
  readonly cmakeMinVersion = new Version(3, 15);

  private readonly variable = 'CMAKE_MSVC_RUNTIME_LIBRARY';

  readonly serializeCommandName = 'cmaker_cmake_msvc_runtime_library';
  readonly serializeCommandParser: CMakeCommandTyped = {
    component: CMakeMsvcRuntimeLibraryVariable,
  };

  private readonly helpText = 'Build using CRT shared libraries';

  private readonly dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputCheckboxModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  readonly validateArgs = [
    (_action: InputCheckboxModel): Promise<boolean> => Promise.resolve(true),
  ] as const;

  readonly validateArg = [
    (
      control: AbstractControl<boolean, boolean>,
      _context: InputCheckboxModel
    ): Promise<boolean> =>
      this.validateArgs[0]({
        checked: control.value,
      }),
  ] as const;

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
          value: this.dataToCMake.booleanToString(action.checked),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputCheckboxModel): Promise<string> {
    return Promise.resolve(`# Windows only
option(${this.variable} "${this.helpText}" ${this.dataToCMake.booleanToString(
      action.checked
    )})

if(NOT ${this.variable})
  cmake_policy(SET CMP0091 NEW)
  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()`);
  }

  toCMakerTxt(action: InputCheckboxModel): string {
    return `${this.serializeCommandName}(${this.dataToCMake.booleanToString(
      action.checked
    )})`;
  }
}
