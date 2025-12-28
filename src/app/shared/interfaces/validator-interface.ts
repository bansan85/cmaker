import { Signal } from '@angular/core';

export interface ValidatorInterface {
  isValid: Signal<boolean>;
}
