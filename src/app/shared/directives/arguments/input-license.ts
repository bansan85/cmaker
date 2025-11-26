import { Directive, effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputLicenseModel } from '../../models/arguments/input-license-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Directive({
  selector: '[appInputLicense]',
})
export abstract class InputLicense
  implements CheckboxesItemInterface, InputLicenseModel
{
  enabled = true;
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  protected isValid = signal(false);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected valueSignal = signal('');
  get value(): string {
    return this.valueSignal();
  }
  set value(val: string) {
    this.valueSignal.set(val);
  }
}
