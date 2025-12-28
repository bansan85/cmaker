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

  private readonly isValidResource = resource<boolean, InputLicenseModel>({
    params: () => ({ enabled: this.enabled, license: this.license }),
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

  private readonly licenseSignal = signal('');
  get license(): string {
    return this.licenseSignal();
  }
  set license(val: string) {
    this.licenseSignal.set(val);
  }
}
