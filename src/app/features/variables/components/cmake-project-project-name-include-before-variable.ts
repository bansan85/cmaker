import { Component, forwardRef, inject } from '@angular/core';
import { CMakeProjectProjectNameIncludeBeforeVariableService } from '../services/cmake-project-project-name-include-before-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectProjectNameIncludeBeforeVariableModel } from '../models/cmake-project-project-name-include-before-variable.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';
import { FormsModule } from '@angular/forms';
import { open } from '@tauri-apps/plugin-dialog';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

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
    CMakeProjectProjectNameIncludeBeforeVariableModel
{
  service = inject(CMakeProjectProjectNameIncludeBeforeVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
  rustBackendService = inject(RustBackendService);

  readonly cmakeProjectProjectNameIncludeBeforeProjectNameId = `cmake-project-project-name-include-before-project-name-${crypto.randomUUID()}`;
  readonly cmakeProjectProjectNameIncludeBeforePathId = `cmake-project-project-name-include-before-path-${crypto.randomUUID()}`;

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
