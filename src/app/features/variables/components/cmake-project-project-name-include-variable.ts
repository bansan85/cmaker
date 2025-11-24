import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectProjectNameIncludeVariableService } from '../services/cmake-project-project-name-include-variable-service';
import { open } from '@tauri-apps/plugin-dialog';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectProjectNameIncludeVariableModel } from '../models/cmake-project-project-name-include-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';

@Component({
  selector: 'app-cmake-project-project-name-include-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-project-name-include-variable.html',
  styleUrl: './cmake-project-project-name-include-variable.css',
  providers: [
    CMakeProjectProjectNameIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectProjectNameIncludeVariable),
    },
  ],
})
export class CMakeProjectProjectNameIncludeVariable
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeVariableService>,
    CheckboxesItemInterface,
    CMakeProjectProjectNameIncludeVariableModel
{
  readonly name = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE';

  protected readonly cmakeProjectProjectNameIncludeProjectNameId = `cmake-project-project-name-include-project-name-${crypto.randomUUID()}`;
  protected readonly cmakeProjectProjectNameIncludePathId = `cmake-project-project-name-include-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectProjectNameIncludeVariableService);

  private readonly projectContext = inject(ProjectContextService);
  private readonly rustBackendService = inject(RustBackendService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(false);

  enabled = true;

  protected projectNameSignal = signal<string>('');
  public get projectName(): string {
    return this.projectNameSignal();
  }
  public set projectName(v: string) {
    this.projectNameSignal.set(v);
  }

  private valueSignal = signal<string[]>([]);
  public get value(): string[] {
    return this.valueSignal();
  }
  public set value(v: string[]) {
    this.valueSignal.set(v);
  }

  rows = 1;

  public get valueSingleLine() {
    return this.value.join('\n');
  }

  public set valueSingleLine(value: string) {
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
