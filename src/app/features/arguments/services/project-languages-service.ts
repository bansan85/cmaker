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
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  readonly validateArgs = [
    (_action: InputLanguagesModel): Promise<boolean> => Promise.resolve(true),
  ];

  protected cmakeRequiredVersionImpl(
    action: InputLanguagesModel
  ): Version | null {
    const languages = action.languages.split(' ');
    if (languages.includes('ASM_MARMASM')) {
      return new Version(3, 26);
    } else if (languages.includes('HIP')) {
      return new Version(3, 21);
    } else if (languages.includes('ISPC')) {
      return new Version(3, 18);
    } else if (languages.includes('OBJC') || languages.includes('OBJCXX')) {
      return new Version(3, 16);
    } else if (languages.includes('Swift')) {
      return new Version(3, 15);
    } else if (languages.includes('CSharp') || languages.includes('CUDA')) {
      return new Version(3, 8);
    } else {
      return this.cmakeMinVersion;
    }
  }

  protected cmakeObjectsImpl(_action: InputLanguagesModel): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(action: InputLanguagesModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputLanguagesModel): string {
    return `LANGUAGES ${action.languages}\n`;
  }
}
