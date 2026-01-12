import { Injectable } from '@angular/core';

import { Version } from '../../../shared/models/version';
import { DataToCMakeOptions } from '../models/data-to-cmake-options';

@Injectable({
  providedIn: 'root',
})
export class DataToCMakeService {
  booleanToString(value: boolean): string {
    if (value) {
      return 'ON';
    } else {
      return 'OFF';
    }
  }

  stringToBoolean(value: string): boolean {
    if (value === 'ON') {
      return true;
    } else if (value === 'OFF') {
      return false;
    } else {
      throw Error(`${value} is not boolean.`);
    }
  }

  stringToVersion(value: string): Version | undefined {
    if (Version.isValid(value)) {
      return new Version(value);
    } else {
      return undefined;
    }
  }

  isValidTargetName(name: string): boolean {
    return /^[A-Za-z0-9_.+-]+$/u.test(name);
  }

  filesToArrayString(value: string): string[] {
    return value.split(',');
  }

  stringToCMakeName(name: string, options: DataToCMakeOptions): string {
    if (options.project) {
      name = name.replace('<PROJECT-NAME>', options.project);
    }
    return name;
  }
}
