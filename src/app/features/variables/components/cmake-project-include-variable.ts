import { Component, forwardRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectIncludeVariableService } from '../services/cmake-project-include-variable-service';
import { CMakeProjectIncludeVariableModel } from '../models/cmake-project-include-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { open } from '@tauri-apps/plugin-dialog';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-cmake-project-include-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-include-variable.html',
  styleUrl: './cmake-project-include-variable.css',
  providers: [
    CMakeProjectIncludeVariableService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => CMakeProjectIncludeVariable),
    },
  ],
})
export class CMakeProjectIncludeVariable
  implements
    CMakeComponentInterface<CMakeProjectIncludeVariableService>,
    CMakeProjectIncludeVariableModel
{
  service = inject(CMakeProjectIncludeVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
  rustBackendService = inject(RustBackendService);

  readonly cmakeProjectIncludePathId = `cmake-project-include-path-${crypto.randomUUID()}`;

  enabled = true;

  value: string[] = [];

  isValid = false;
  rows = 2;

  public get valueSingleLine() {
    return this.value.join('\n');
  }

  public set valueSingleLine(value: string) {
    this.value = value.split('\n');
    this.rows = this.value.length + 2;
    this.service
      .isValid(this)
      .then((isValid) => (this.isValid = isValid))
      .catch((err: unknown) => {
        console.log(err);
      });
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
      this.rustBackendService
        .diffPath(this.projectContext.rootPath, absolutePath)
        .then((relativePath) => {
          if (this.valueSingleLine === '') {
            this.valueSingleLine = relativePath;
          } else {
            this.valueSingleLine = `${this.valueSingleLine}\n${relativePath}`;
          }
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    }
  }
}
