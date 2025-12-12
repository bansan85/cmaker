import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectNameService extends CMakeArgumentInterface<InputStringModel> {
  readonly cmakeMinVersion = null;
  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputStringModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: InputStringModel): Promise<boolean> {
    return Promise.resolve(this.dataToCMake.isValidTargetName(action.value));
  }

  protected cmakeRequiredVersionImpl(
    _action: InputStringModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputStringModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_NAME',
          version: null,
        },
        {
          name: 'CMAKE_PROJECT_NAME',
          version: null,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputStringModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputStringModel): string {
    return `${action.value}\n`;
  }
}
