import { Component, inject } from '@angular/core';
import { CMakeProjectIncludeBeforeVariableService } from '../services/cmake-project-include-before-variable-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CMakeProjectIncludeBeforeVariableModel } from '../models/cmake-project-include-before-variable.model';
import { FormsModule } from '@angular/forms';

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
    this.service.isValid(this).then((isValid) => (this.isValid = isValid));
  }
}
