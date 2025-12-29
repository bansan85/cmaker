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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.required<(control: AbstractControl, context: any) => boolean>();
  readonly appInvalidValidatorContext = input.required<unknown>();

  validate(control: AbstractControl): ValidationErrors | null {
    return this.appInvalidValidator()(
      control,
      this.appInvalidValidatorContext()
    )
      ? null
      : { invalid: true };
  }
}
