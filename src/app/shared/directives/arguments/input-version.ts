import { Directive, effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputVersionModel } from '../../models/arguments/input-version-model';
import { Version } from '../../models/version';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';

@Directive({
  selector: '[appInputVersion]',
})
export abstract class InputVersion
  implements CheckboxesItemInterface, InputVersionModel, ValidatorInterface
{
  readonly isValid = signal(false);

  enabled = true;

  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  constructor() {
    effect(() => {
      this.service
        .isValid(this)
        .then((result) => {
          this.isValid.set(result);
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    });
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
