import { Injectable } from '@angular/core';

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
}
