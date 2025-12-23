import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { InputFilesModel } from '../../../shared/models/arguments/input-files-model';
import { CMakeCommandInterface } from '../../commands/services/cmake-command-interface';
import { CMakeProjectIncludeBeforeVariable } from '../components/cmake-project-include-before-variable';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';

@Injectable({
  providedIn: null,
})
export class CMakeProjectIncludeBeforeVariableService extends CMakeCommandInterface<InputFilesModel> {
  readonly cmakeMinVersion = new Version(3, 15);

  private readonly variable = 'CMAKE_PROJECT_INCLUDE_BEFORE';

  readonly serializeCommandName = 'set';
  readonly serializeCommandParser: CMakeCommandTyped = {
    firstArgument: this.variable,
    component: CMakeProjectIncludeBeforeVariable,
  };

  private rustBackendService = inject(RustBackendService);

  isEnabled(action: InputFilesModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.value === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.value
        ))
    );
  }

  async isValid(action: InputFilesModel): Promise<boolean> {
    return (
      action.value.length > 0 &&
      (await this.rustBackendService.relativePathsExists(
        this.projectContext.rootPath,
        action.value,
        false
      ))
    );
  }

  protected cmakeRequiredVersionImpl(action: InputFilesModel): Version | null {
    if (action.value.length > 1) {
      return new Version(3, 29);
    } else {
      return this.cmakeMinVersion;
    }
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
    return `${this.serializeCommandName}(${this.variable} "${action.value.join(
      ';'
    )}")\n`;
  }
}
