import { Injectable } from '@angular/core';
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
