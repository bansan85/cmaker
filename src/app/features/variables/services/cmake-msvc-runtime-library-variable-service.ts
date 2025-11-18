import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeMsvcRuntimeLibraryVariable } from '../../variables/components/cmake-msvc-runtime-library-variable';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';

@Injectable({
  providedIn: 'root',
})
export class CMakeMsvcRuntimeLibraryVariableService extends CMakeFeatureInterface<CMakeMsvcRuntimeLibraryVariable> {
  private readonly variable = 'CRT_SHARED_LIBS';
  private readonly helpText = 'Build using CRT shared libraries';

  private dataToCMake = inject(DataToCMakeService);
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(3, 15);

  isEnabled(action: CMakeMsvcRuntimeLibraryVariable): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: CMakeMsvcRuntimeLibraryVariable): boolean {
    return true;
  }

  protected cmakeRequiredVersionImpl(
    _action: CMakeMsvcRuntimeLibraryVariable
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    action: CMakeMsvcRuntimeLibraryVariable
  ): CMakeAvailableData {
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

  protected toCMakeListTxtImpl(
    action: CMakeMsvcRuntimeLibraryVariable
  ): string {
    return `# Windows only
option(${this.variable} "${this.helpText}" ${this.dataToCMake.booleanToString(
      action.value
    )})

if(NOT ${this.variable})
  cmake_policy(SET CMP0091 NEW)
  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
endif()
`;
  }
}
