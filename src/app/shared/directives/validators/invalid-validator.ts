import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appInvalidValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InvalidValidator,
      multi: true,
    },
  ],
})
export class InvalidValidator implements Validator {
  readonly appInvalidValidator =
    input.required<(control: AbstractControl) => boolean>();

  validate(control: AbstractControl): ValidationErrors | null {
    return this.appInvalidValidator()(control) ? null : { invalid: true };
  }
}
