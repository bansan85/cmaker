import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputProjectNameFilesModel } from '../../../shared/models/arguments/input-project-name-files-model';
import { Version } from '../../../shared/models/version';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';
import { CMakeProjectProjectNameIncludeBeforeVariable } from '../components/cmake-project-project-name-include-before-variable';

@Injectable({
  providedIn: null,
})
export class CMakeProjectProjectNameIncludeBeforeVariableService extends CMakeCommandInterface<InputProjectNameFilesModel> {
  readonly cmakeMinVersion = new Version(3, 17);

  private readonly variable = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE';

  readonly serializeCommandName = 'set';
  readonly serializeCommandParser: CMakeCommandTyped = {
    firstArgument: this.variable,
    component: CMakeProjectProjectNameIncludeBeforeVariable,
  };

  private rustBackendService = inject(RustBackendService);
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputProjectNameFilesModel): boolean {
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
    (action: InputProjectNameFilesModel): Promise<boolean> =>
      Promise.resolve(this.dataToCMake.isValidTargetName(action.projectName)),
    async (action: InputProjectNameFilesModel): Promise<boolean> =>
      action.files.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.files,
        false
      )),
  ] as const;

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      context: InputProjectNameFilesModel
    ): Promise<boolean> =>
      this.validateArgs[0]({
        projectName: control.value,
        files: context.files,
      }),
    (
      control: AbstractControl<string, string>,
      context: InputProjectNameFilesModel
    ): Promise<boolean> =>
      this.validateArgs[1]({
        projectName: context.projectName,
        files: this.dataToCMake.filesToArrayString(control.value),
      }),
  ] as const;

  protected cmakeRequiredVersionImpl(
    action: InputProjectNameFilesModel
  ): Version | null {
    if (action.files.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(
    action: InputProjectNameFilesModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: this.dataToCMake.stringToCMakeName(this.variable, {
            project: action.projectName,
          }),
          version: this.cmakeRequiredVersionImpl(action),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(
    action: InputProjectNameFilesModel
  ): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputProjectNameFilesModel): string {
    return `set(${this.dataToCMake.stringToCMakeName(this.variable, {
      project: action.projectName,
    })} "${action.files.join(';')}")\n`;
  }
}
