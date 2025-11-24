import { Component, effect, forwardRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectTopLevelIncludesVariableService } from '../services/cmake-project-top-level-includes-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectTopLevelIncludesVariableModel } from '../models/cmake-project-top-level-includes-variable.model';
import { open } from '@tauri-apps/plugin-dialog';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';

@Component({
  selector: 'app-cmake-project-top-level-includes-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-top-level-includes-variable.html',
  styleUrl: './cmake-project-top-level-includes-variable.css',
  providers: [
    CMakeProjectTopLevelIncludesVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectTopLevelIncludesVariable),
    },
  ],
})
export class CMakeProjectTopLevelIncludesVariable
  implements
    CMakeComponentInterface<CMakeProjectTopLevelIncludesVariableService>,
    CheckboxesItemInterface,
    CMakeProjectTopLevelIncludesVariableModel
{
  readonly name = 'CMAKE_PROJECT_TOP_LEVEL_INCLUDES';

  protected readonly cmakeProjectTopLevelIncludesPathId = `cmake-project-top-level-includes-path-${crypto.randomUUID()}`;

  readonly service = inject(CMakeProjectTopLevelIncludesVariableService);

  private projectContext = inject(ProjectContextService);
  private rustBackendService = inject(RustBackendService);

  constructor() {
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(false);

  enabled = true;

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
