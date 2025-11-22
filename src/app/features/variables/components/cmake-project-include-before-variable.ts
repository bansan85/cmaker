import { Component, inject } from '@angular/core';
import { CMakeProjectIncludeBeforeVariableService } from '../services/cmake-project-include-before-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CMakeProjectIncludeBeforeVariableModel } from '../models/cmake-project-include-before-variable.model';
import { FormsModule } from '@angular/forms';
import { open } from '@tauri-apps/plugin-dialog';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Component({
  selector: 'app-cmake-project-include-before-variable',
  imports: [FormsModule],
  templateUrl: './cmake-project-include-before-variable.html',
  styleUrl: './cmake-project-include-before-variable.css',
  providers: [CMakeProjectIncludeBeforeVariableService],
})
export class CMakeProjectIncludeBeforeVariable
  implements
    CMakeComponentInterface<CMakeProjectIncludeBeforeVariableService>,
    CMakeProjectIncludeBeforeVariableModel
{
  service = inject(CMakeProjectIncludeBeforeVariableService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
  rustBackendService = inject(RustBackendService);

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
