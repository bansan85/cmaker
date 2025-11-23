import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectProjectNameIncludeVariableService } from '../services/cmake-project-project-name-include-variable-service';
import { open } from '@tauri-apps/plugin-dialog';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectProjectNameIncludeVariableModel } from '../models/cmake-project-project-name-include-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Component({
  selector: 'app-cmake-project-project-name-include-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-project-name-include-variable.html',
  styleUrl: './cmake-project-project-name-include-variable.css',
  providers: [CMakeProjectProjectNameIncludeVariableService],
})
export class CMakeProjectProjectNameIncludeVariable
  implements
    CMakeComponentInterface<CMakeProjectProjectNameIncludeVariableService>,
    CMakeProjectProjectNameIncludeVariableModel
{
  service = inject(CMakeProjectProjectNameIncludeVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
  rustBackendService = inject(RustBackendService);

  readonly cmakeProjectProjectNameIncludeProjectNameId = `cmake-project-project-name-include-project-name-${crypto.randomUUID()}`;
  readonly cmakeProjectProjectNameIncludePathId = `cmake-project-project-name-include-path-${crypto.randomUUID()}`;

  enabled = true;

  private _projectName = '';

  get projectName(): string {
    return this._projectName;
  }

  set projectName(value: string) {
    this._projectName = value;
    this.service
      .isValid(this)
      .then((isValid) => (this.isValid = isValid))
      .catch((err: unknown) => {
        console.log(err);
      });
  }

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
