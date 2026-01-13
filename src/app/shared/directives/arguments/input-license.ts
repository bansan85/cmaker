import { inject, signal } from '@angular/core';

import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { InputLicenseModel } from '../../models/arguments/input-license-model';
import { ResourceService } from '../../services/resource-service';

export abstract class InputLicense
  implements CheckboxesItemInterface, InputLicenseModel, ValidatorInterface
{
  abstract readonly itemName: string;
  abstract readonly service: CMakeFeatureInterface<InputLicenseModel>;

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputLicenseModel>(
      () => ({ enabled: this.enabled, license: this.license }),
      (params) => this.service.isValid(params),
      false
    );

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
