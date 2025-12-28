import { computed, resource, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputLicenseModel } from '../../models/arguments/input-license-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';

export abstract class InputLicense
  implements CheckboxesItemInterface, InputLicenseModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputLicenseModel>;

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

  protected readonly valueSignal = signal('');
  get value(): string {
    return this.valueSignal();
  }
  set value(val: string) {
    this.valueSignal.set(val);
  }
}
