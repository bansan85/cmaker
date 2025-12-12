import { inject, Injectable } from '@angular/core';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { Version } from '../../../shared/models/version';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { InputProjectNameFilesModel } from '../../../shared/models/arguments/input-project-name-files-model';
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
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  async isValid(action: InputProjectNameFilesModel): Promise<boolean> {
    return (
      this.dataToCMake.isValidTargetName(action.projectName) &&
      action.value.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      ))
    );
  }

  protected cmakeRequiredVersionImpl(
    action: InputProjectNameFilesModel
  ): Version | null {
    if (action.value.length > 1) {
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
    })} "${action.value.join(';')}")\n`;
  }
}
