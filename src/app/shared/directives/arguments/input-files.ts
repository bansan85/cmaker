import { Directive, effect, inject, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputFilesModel } from '../../models/arguments/input-files-model';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { open } from '@tauri-apps/plugin-dialog';
import { RustBackendService } from '../../services/rust-backend-service';
import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';
import { ValidatorInterface } from '../../interfaces/validator-interface';

@Directive({
  selector: '[appInputFiles]',
})
export abstract class InputFiles
  extends ValidatorInterface
  implements CheckboxesItemInterface, InputFilesModel
{
  enabled = true;
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<unknown>;

  private readonly rustBackendService = inject(RustBackendService);
  private readonly projectContext = inject(ProjectContextService);

  constructor() {
    super();
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  private valueSignal = signal<string[]>([]);
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
