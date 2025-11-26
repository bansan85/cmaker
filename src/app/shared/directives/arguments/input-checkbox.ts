import { Directive, effect, signal, WritableSignal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputCheckboxModel } from '../../models/arguments/input-checkbox-model';

@Directive({
  selector: '[appInputCheckbox]',
})
export abstract class InputCheckbox
  implements CheckboxesItemInterface, InputCheckboxModel
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

  protected abstract valueSignal: WritableSignal<boolean>;
  get value(): boolean {
    return this.valueSignal();
  }
  set value(val: boolean) {
    this.valueSignal.set(val);
  }
}
