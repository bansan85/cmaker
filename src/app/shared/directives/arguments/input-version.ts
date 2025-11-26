import { Directive, effect, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputVersionModel } from '../../models/arguments/input-version-model';
import { Version } from '../../models/version';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Directive({
  selector: '[appInputVersion]',
})
export abstract class InputVersion
  implements CheckboxesItemInterface, InputVersionModel
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

  private valueSignal = signal<Version | undefined>(undefined);
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
