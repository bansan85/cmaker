import { WritableSignal } from '@angular/core';

export interface ValidatorInterface {
  isValid: WritableSignal<boolean>;
}
