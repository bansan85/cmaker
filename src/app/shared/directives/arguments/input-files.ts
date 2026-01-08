import { inject, signal } from '@angular/core';
import { open } from '@tauri-apps/plugin-dialog';

import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { ValidatorInterface } from '../../interfaces/validator-interface';
import { InputFilesModel } from '../../models/arguments/input-files-model';
import { ResourceService } from '../../services/resource-service';
import { RustBackendService } from '../../services/rust-backend-service';

export abstract class InputFiles
  implements CheckboxesItemInterface, InputFilesModel, ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputFilesModel>;

  private readonly rustBackendService = inject(RustBackendService);
  private readonly projectContext = inject(ProjectContextService);

  private readonly resourceService = inject(ResourceService);
  readonly isValid =
    this.resourceService.createValidationResource<InputFilesModel>(
      () => ({ enabled: this.enabled, files: this.files }),
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

  private readonly filesSignal = signal<string[]>([]);
  public get files(): string[] {
    return this.filesSignal();
  }
  public set files(v: string[]) {
    this.filesSignal.set(v);
  }

  rows = 1;

  protected get filesSingleLine() {
    return this.files.join('\n');
  }

  protected set filesSingleLine(value: string) {
    this.files = value.split('\n');
    this.filesSignal.set(this.files);
    this.rows = this.files.length + 1;
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
      if (this.filesSingleLine === '') {
        this.filesSingleLine = relativePath;
      } else {
        this.filesSingleLine = `${this.filesSingleLine}\n${relativePath}`;
      }
    }
  }
}
