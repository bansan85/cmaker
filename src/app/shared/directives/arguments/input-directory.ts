import { inject, signal } from '@angular/core';
import { open } from '@tauri-apps/plugin-dialog';

import { CMakeComponentInterface } from '../../../features/cmake-project/models/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { InputDirectoryModel } from '../../models/arguments/input-directory-model';
import { ResourceService } from '../../services/resource-service';

export abstract class InputDirectory
  implements
    CheckboxesItemInterface,
    InputDirectoryModel,
    ValidatorInterface,
    CMakeComponentInterface<InputDirectoryModel>
{
  abstract readonly itemName: string;
  abstract readonly service: CMakeFeatureInterface<InputDirectoryModel>;

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputDirectoryModel>(
      () => ({ enabled: this.enabled, directory: this.directory }),
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
