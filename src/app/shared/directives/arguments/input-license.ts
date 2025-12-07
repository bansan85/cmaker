import { Directive, effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputLicenseModel } from '../../models/arguments/input-license-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';

@Directive({
  selector: '[appInputLicense]',
})
export abstract class InputLicense
  implements CheckboxesItemInterface, InputLicenseModel, ValidatorInterface
{
  readonly isValid = signal(false);

  enabled = true;

  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  constructor() {
    effect(() => {
      this.service
        .isValid(this)
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    });
  }

  protected readonly valueSignal = signal('');
  get value(): string {
    return this.valueSignal();
  }
  set value(val: string) {
    this.valueSignal.set(val);
  }
}
