import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputLanguagesModel } from '../../../shared/models/arguments/input-languages-model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/models/cmake-available-data';
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
    (action: InputLanguagesModel): Promise<boolean> => {
      const languages = action.languages
        .split(' ')
        .filter((language) => language !== '');

      if (languages.length === 0) {
        return Promise.resolve(false);
      }

      if (languages.length === 1 && languages[0] === 'NONE') {
        return Promise.resolve(true);
      }

      for (const item of languages) {
        if (!this.allLanguages.some((lang) => lang.name === item)) {
          return Promise.resolve(false);
        }
      }

      return Promise.resolve(true);
    },
  ] as const;

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputLanguagesModel
    ): Promise<boolean> => this.validateArgs[0]({ languages: control.value }),
  ] as const;

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
    return `LANGUAGES${action.languages.length === 0 ? '' : ' '}${
      action.languages
    }`;
  }

  allLanguages: {
    name: string;
    version: Version | null;
  }[] = [
    { name: 'C', version: null },
    { name: 'CXX', version: null },
    { name: 'CSharp', version: new Version(3, 8) },
    { name: 'CUDA', version: new Version(3, 8) },
    { name: 'OBJC', version: new Version(3, 16) },
    { name: 'OBJCXX', version: new Version(3, 16) },
    { name: 'Fortran', version: null },
    { name: 'HIP', version: new Version(3, 21) },
    { name: 'ISPC', version: new Version(3, 18) },
    { name: 'Swift', version: new Version(3, 15) },
    { name: 'ASM', version: null },
    { name: 'ASM_NASM', version: null },
    { name: 'ASM_MARMASM', version: new Version(3, 26) },
    { name: 'ASM_MASM', version: null },
    { name: 'ASM-ATT', version: null },
  ];
}
