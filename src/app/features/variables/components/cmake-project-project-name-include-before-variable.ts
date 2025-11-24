import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { CMakeProjectProjectNameIncludeBeforeVariableService } from '../services/cmake-project-project-name-include-before-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectProjectNameIncludeBeforeVariableModel } from '../models/cmake-project-project-name-include-before-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { FormsModule } from '@angular/forms';
import { open } from '@tauri-apps/plugin-dialog';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';

@Component({
  selector: 'app-cmake-project-project-name-include-before-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-project-name-include-before-variable.html',
  styleUrl: './cmake-project-project-name-include-before-variable.css',
  providers: [
    CMakeProjectProjectNameIncludeBeforeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(
        () => CMakeProjectProjectNameIncludeBeforeVariable
      ),
    },
  ],
})
export class CMakeProjectProjectNameIncludeBeforeVariable
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeBeforeVariableService>,
    CheckboxesItemInterface,
    CMakeProjectProjectNameIncludeBeforeVariableModel
{
  readonly name = 'CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE';

  protected readonly cmakeProjectProjectNameIncludeBeforeProjectNameId = `cmake-project-project-name-include-before-project-name-${crypto.randomUUID()}`;
  protected readonly cmakeProjectProjectNameIncludeBeforePathId = `cmake-project-project-name-include-before-path-${crypto.randomUUID()}`;

  readonly service = inject(
    CMakeProjectProjectNameIncludeBeforeVariableService
  );

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
