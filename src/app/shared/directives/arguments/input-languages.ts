import { inject, signal, WritableSignal } from '@angular/core';

import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { InputLanguagesModel } from '../../models/arguments/input-languages-model';
import { ResourceService } from '../../services/resource-service';

export abstract class InputLanguages
  implements CheckboxesItemInterface, InputLanguagesModel, ValidatorInterface
{
  abstract readonly itemName: string;
  abstract service: CMakeFeatureInterface<InputLanguagesModel>;

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputLanguagesModel>(
      () => ({ enabled: this.enabled, languages: this.languages }),
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

  get languages(): string {
    return (
      this.allLanguages
        .filter((item) => item().enabled)
        .map((item) => item().itemName)
        .join(' ') || 'NONE'
    );
  }
  set languages(value: string) {
    const values = value.split(' ');
    for (const item of this.allLanguages) {
      item().enabled = values.includes(item().itemName);
    }
  }

  protected abstract allLanguages: WritableSignal<CheckboxesItemInterface>[];
}
