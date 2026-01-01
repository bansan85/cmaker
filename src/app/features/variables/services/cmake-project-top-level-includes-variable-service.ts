import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputFilesModel } from '../../../shared/models/arguments/input-files-model';
import { Version } from '../../../shared/models/version';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';
import { CMakeProjectTopLevelIncludesVariable } from '../components/cmake-project-top-level-includes-variable';

@Injectable({
  providedIn: null,
})
export class CMakeProjectTopLevelIncludesVariableService extends CMakeCommandInterface<InputFilesModel> {
  readonly cmakeMinVersion = new Version(3, 24);

  private readonly variable = 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES';

  readonly serializeCommandName = 'set';
  readonly serializeCommandParser: CMakeCommandTyped = {
    firstArgument: this.variable,
    component: CMakeProjectTopLevelIncludesVariable,
  };

  private readonly rustBackendService = inject(RustBackendService);
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputFilesModel): boolean {
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
    async (action: InputFilesModel): Promise<boolean> =>
      action.files.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.files,
        false
      )),
  ];

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputFilesModel
    ): Promise<boolean> =>
      this.validateArgs[0]({
        files: this.dataToCMake.filesToArrayString(control.value),
      }),
  ];

  protected cmakeRequiredVersionImpl(_action: InputFilesModel): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(action: InputFilesModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: this.variable,
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputFilesModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputFilesModel): string {
    return `${this.serializeCommandName}(${this.variable} "${action.files.join(
      ';'
    )}")\n`;
  }
}
