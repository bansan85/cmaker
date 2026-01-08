import { Directive, inject, input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { from, map, Observable, of } from 'rxjs';

import { DataToCMakeService } from '../../../features/cmake-project/services/data-to-cmake-service';

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
  readonly appAsyncInvalidValidator = input.required<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (control: AbstractControl, context: any) => Promise<boolean>
  >();
  readonly appAsyncInvalidValidatorContext = input.required<unknown>();

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control.value === null) {
      return of({ invalid: true });
    }

    return from(
      this.appAsyncInvalidValidator()(
        control,
        this.appAsyncInvalidValidatorContext()
      )
    ).pipe(map((isValid) => (isValid ? null : { invalid: true })));
  }
}
