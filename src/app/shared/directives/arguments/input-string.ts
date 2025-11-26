import { Directive, effect, signal, WritableSignal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputStringModel } from '../../models/arguments/input-string-model';

@Directive({
  selector: '[appInputString]',
})
export abstract class InputString
  implements CheckboxesItemInterface, InputStringModel
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
