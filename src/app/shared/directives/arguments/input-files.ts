import { computed, inject, resource, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputFilesModel } from '../../models/arguments/input-files-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { open } from '@tauri-apps/plugin-dialog';
import { RustBackendService } from '../../services/rust-backend-service';
import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';
import { ValidatorInterface } from '../../interfaces/validator-interface';

export abstract class InputFiles
  implements CheckboxesItemInterface, InputFilesModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputFilesModel>;

  private readonly rustBackendService = inject(RustBackendService);
  private readonly projectContext = inject(ProjectContextService);

  private readonly isValidResource = resource({
    params: () => ({ enabled: this.enabled, value: this.value }),
    loader: ({ params }) => this.service.isValid(params),
  });
  readonly isValid = computed(() => {
    if (this.isValidResource.hasValue()) {
      return this.isValidResource.value();
    }
    return false;
  });

  private readonly enabledSignal = signal(true);
  get enabled(): boolean {
    return this.enabledSignal();
  }
  set enabled(val: boolean) {
    this.enabledSignal.set(val);
  }

  private readonly valueSignal = signal<string[]>([]);
  public get value(): string[] {
    return this.valueSignal();
  }
  public set value(v: string[]) {
    this.valueSignal.set(v);
  }

  rows = 1;

  protected get valueSingleLine() {
    return this.value.join('\n');
  }

  protected set valueSingleLine(value: string) {
    this.value = value.split('\n');
    this.valueSignal.set(this.value);
    this.rows = this.value.length + 1;
  }

  async addPath() {
    const absolutePath = await open({
      multiple: false,
      directory: false,
      filters: [
        { name: 'CMake files', extensions: ['cmake'] },
        { name: 'All files', extensions: ['*'] },
      ],
    });

    if (absolutePath !== null) {
      const relativePath = await this.rustBackendService.diffPath(
        this.projectContext.rootPath,
        absolutePath
      );
      if (this.valueSingleLine === '') {
        this.valueSingleLine = relativePath;
      } else {
        this.valueSingleLine = `${this.valueSingleLine}\n${relativePath}`;
      }
    }
  }
}
