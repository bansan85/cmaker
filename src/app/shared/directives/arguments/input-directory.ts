import { effect, inject, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputDirectoryModel } from '../../models/arguments/input-directory-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { RustBackendService } from '../../services/rust-backend-service';
import { unknownAssertError } from '../../interfaces/errors';
import { open } from '@tauri-apps/plugin-dialog';
import { AbstractControl } from '@angular/forms';

export abstract class InputDirectory
  implements CheckboxesItemInterface, InputDirectoryModel, ValidatorInterface
{
  readonly isValid = signal(false);

  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputDirectoryModel>;

  private readonly rustBackendService = inject(RustBackendService);

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

  private readonly valueSignal = signal<string>('');
  public get value(): string {
    return this.valueSignal();
  }
  public set value(v: string) {
    this.valueSignal.set(v);
  }

  async selectPath() {
    const rootPath = await open({
      multiple: false,
      directory: true,
    });

    if (rootPath !== null) {
      this.value = rootPath;
    }
  }

  protected checkPath = async (
    control: AbstractControl<string>
  ): Promise<boolean> => this.service.isValid({ value: control.value });
}
