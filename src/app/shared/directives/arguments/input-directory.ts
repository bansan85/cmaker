import { computed, resource, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputDirectoryModel } from '../../models/arguments/input-directory-model';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { open } from '@tauri-apps/plugin-dialog';
import { AbstractControl } from '@angular/forms';

export abstract class InputDirectory
  implements CheckboxesItemInterface, InputDirectoryModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputDirectoryModel>;

  private readonly isValidResource = resource<boolean, InputDirectoryModel>({
    params: () => ({ enabled: this.enabled, directory: this.directory }),
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

  private readonly directorySignal = signal<string>('');
  public get directory(): string {
    return this.directorySignal();
  }
  public set directory(v: string) {
    this.directorySignal.set(v);
  }

  async selectPath() {
    const directory = await open({
      multiple: false,
      directory: true,
    });

    if (directory !== null) {
      this.directory = directory;
    }
  }
}
