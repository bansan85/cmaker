import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProjectNameService extends CMakeArgumentInterface<InputStringModel> {
  readonly cmakeMinVersion = null;

  private dataToCMake = inject(DataToCMakeService);

  isEnabled(action: InputStringModel): boolean {
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
    (action: InputStringModel): Promise<boolean> =>
      Promise.resolve(this.dataToCMake.isValidTargetName(action.text)),
  ];

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputStringModel
    ): Promise<boolean> => this.validateArgs[0]({ text: control.value }),
  ];

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
    return `${action.text}\n`;
  }
}
