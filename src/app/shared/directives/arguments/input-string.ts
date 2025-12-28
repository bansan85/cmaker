import { effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputStringModel } from '../../models/arguments/input-string-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { unknownAssertError } from '../../interfaces/errors';

export abstract class InputString
  implements CheckboxesItemInterface, InputStringModel, ValidatorInterface
{
  readonly isValid = signal(false);
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputStringModel>;

  constructor() {
    effect(() => {
      this.service
        .isValid({ enabled: this.enabled, value: this.value })
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          throw unknownAssertError(err);
        });
    });
  }

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  private readonly valueSignal = signal('');
  get value(): string {
    return this.valueSignal();
  }
  set value(val: string) {
    this.valueSignal.set(val);
  }
}
