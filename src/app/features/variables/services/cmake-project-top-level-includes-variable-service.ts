import { inject, Injectable } from '@angular/core';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { InputFilesModel } from '../../../shared/models/arguments/input-files-model';

@Injectable({
  providedIn: null,
})
export class CMakeProjectTopLevelIncludesVariableService extends CMakeFeatureInterface<InputFilesModel> {
  readonly cmakeMinVersion = new Version(3, 24);

  private readonly variable = 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES';

  private rustBackendService = inject(RustBackendService);

  isEnabled(action: InputFilesModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
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
    return `set(${this.variable} "${action.value.join(';')}")\n`;
  }
}
