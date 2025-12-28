import { computed, resource, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { InputStringModel } from '../../models/arguments/input-string-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';

export abstract class InputString
  implements CheckboxesItemInterface, InputStringModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputStringModel>;

  private readonly isValidResource = resource({
    params: () => ({ enabled: this.enabled, value: this.value }),
    loader: ({ params }) => this.service.isValid(params),
  });
  readonly isValid = computed(() => {
    if (this.isValidResource.hasValue()) {
      return this.isValidResource.value();
    }
    return false;
  });

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
