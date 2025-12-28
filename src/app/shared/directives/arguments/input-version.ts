import { effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputVersionModel } from '../../models/arguments/input-version-model';
import { Version } from '../../models/version';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { unknownAssertError } from '../../interfaces/errors';

export abstract class InputVersion
  implements CheckboxesItemInterface, InputVersionModel, ValidatorInterface
{
  readonly isValid = signal(false);

  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputVersionModel>;

  constructor() {
    effect(() => {
      this.service
        .isValid({ enabled: this.enabled, value: this.value })
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          throw unknownAssertError(err);
        });
    });
  }

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  private readonly valueSignal = signal<Version | undefined>(undefined);
  set value(v: Version | undefined) {
    this.valueSignal.set(v);
    this.valueString = v ? v.toString() : '';
  }
  get value(): Version | undefined {
    return this.valueSignal();
  }

  private valueString = '';
  get versionString(): string {
    return this.valueString;
  }
  set versionString(value: string) {
    this.valueString = value;
    if (Version.isValid(value)) {
      this.valueSignal.set(new Version(value));
    } else {
      this.valueSignal.set(undefined);
    }
  }
}
