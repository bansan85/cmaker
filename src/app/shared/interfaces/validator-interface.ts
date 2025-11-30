import { signal } from '@angular/core';

export class ValidatorInterface {
  isValid = signal(false);
}
