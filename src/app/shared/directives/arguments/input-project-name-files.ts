import { computed, inject, resource, signal } from '@angular/core';
import { CheckboxesItemInterface } from '../../interfaces/checkboxes-item-interface';
import { InputProjectNameFilesModel } from '../../models/arguments/input-project-name-files-model';
import { open } from '@tauri-apps/plugin-dialog';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { RustBackendService } from '../../services/rust-backend-service';
import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';
import { ValidatorInterface } from '../../interfaces/validator-interface';

export abstract class InputProjectNameFiles
  implements
    CheckboxesItemInterface,
    InputProjectNameFilesModel,
    ValidatorInterface
{
  abstract readonly name: string;
  abstract service: CMakeFeatureInterface<InputProjectNameFilesModel>;

  private readonly rustBackendService = inject(RustBackendService);
  private readonly projectContext = inject(ProjectContextService);

  private readonly isValidResource = resource<
    boolean,
    InputProjectNameFilesModel
  >({
    params: () => ({
      enabled: this.enabled,
      projectName: this.projectName,
      files: this.files,
    }),
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

  private readonly projectNameSignal = signal<string>('');
  public get projectName(): string {
    return this.projectNameSignal();
  }
  public set projectName(v: string) {
    this.projectNameSignal.set(v);
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
