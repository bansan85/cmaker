import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CMakeProjectTopLevelIncludesVariableService } from '../services/cmake-project-top-level-includes-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CMakeProjectTopLevelIncludesVariableModel } from '../models/cmake-project-top-level-includes-variable.model';
import { open } from '@tauri-apps/plugin-dialog';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Component({
  selector: 'app-cmake-project-top-level-includes-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-top-level-includes-variable.html',
  styleUrl: './cmake-project-top-level-includes-variable.css',
  providers: [CMakeProjectTopLevelIncludesVariableService],
})
export class CMakeProjectTopLevelIncludesVariable
  implements
    CMakeComponentInterface<CMakeProjectTopLevelIncludesVariableService>,
    CMakeProjectTopLevelIncludesVariableModel
{
  service = inject(CMakeProjectTopLevelIncludesVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
  rustBackendService = inject(RustBackendService);

  readonly cmakeProjectTopLevelIncludesPathId = `cmake-project-top-level-includes-path-${crypto.randomUUID()}`;

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
