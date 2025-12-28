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

  private readonly isValidResource = resource<boolean, InputStringModel>({
    params: () => ({ enabled: this.enabled, text: this.text }),
    loader: ({ params }) => this.service.isValid(params),
    defaultValue: false,
  });
  readonly isValid = computed(() => this.isValidResource.value());

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  private readonly textSignal = signal('');
  get text(): string {
    return this.textSignal();
  }
  set text(val: string) {
    this.textSignal.set(val);
  }
}
