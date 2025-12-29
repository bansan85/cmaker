import { inject, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputVersionModel } from '../../models/arguments/input-version-model';
import { Version } from '../../models/version';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { ResourceService } from '../../services/resource-service';

export abstract class InputVersion
  implements CheckboxesItemInterface, InputVersionModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputVersionModel>;

  private resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputVersionModel>(
      () => ({
        enabled: this.enabled,
        version: this.version,
      }),
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

  private readonly versionSignal = signal<Version | undefined>(undefined);
  set version(v: Version | undefined) {
    this.versionSignal.set(v);
    this.internalVersionString = v ? v.toString() : '';
  }
  get version(): Version | undefined {
    return this.versionSignal();
  }

  private internalVersionString = '';
  get versionString(): string {
    return this.internalVersionString;
  }
  set versionString(value: string) {
    this.internalVersionString = value;
    if (Version.isValid(value)) {
      this.versionSignal.set(new Version(value));
    } else {
      this.versionSignal.set(undefined);
    }
  }
}
