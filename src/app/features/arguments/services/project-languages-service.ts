import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputLanguagesModel } from '../../../shared/models/arguments/input-languages-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectLanguagesService extends CMakeArgumentInterface<InputLanguagesModel> {
  readonly cmakeMinVersion = null;

  isEnabled(action: InputLanguagesModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: InputLanguagesModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputLanguagesModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputLanguagesModel): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(action: InputLanguagesModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputLanguagesModel): string {
    return `LANGUAGES ${action.value}\n`;
  }
}
