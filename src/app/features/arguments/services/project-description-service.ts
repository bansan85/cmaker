import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: null,
})
export class ProjectDescriptionService extends CMakeArgumentInterface<InputStringModel> {
  readonly cmakeMinVersion = new Version(3, 9);

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
    (_action: InputStringModel): Promise<boolean> => Promise.resolve(true),
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
          name: 'PROJECT_DESCRIPTION',
          version: new Version(3, 9),
        },
        {
          name: '<PROJECT-NAME>_DESCRIPTION',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_DESCRIPTION',
          version: new Version(3, 9),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputStringModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputStringModel): string {
    return `DESCRIPTION "${action.text}"\n`;
  }
}
