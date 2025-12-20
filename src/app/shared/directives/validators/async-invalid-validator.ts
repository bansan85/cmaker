import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { from, map, Observable } from 'rxjs';

@Directive({
  selector: '[appAsyncInvalidValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncInvalidValidator,
      multi: true,
    },
  ],
})
export class AsyncInvalidValidator implements AsyncValidator {
  readonly appAsyncInvalidValidator =
    input.required<(control: AbstractControl) => Promise<boolean>>();

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return from(this.appAsyncInvalidValidator()(control)).pipe(
      map((isValid) => (isValid ? null : { invalid: true }))
    );
  }
}
