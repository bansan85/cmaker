import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectSpdxLicenseModel } from '../models/project-spdx-license.model';

@Component({
  selector: 'app-project-spdx-license-argument',
  imports: [FormsModule],
  templateUrl: './project-spdx-license-argument.html',
  styleUrl: './project-spdx-license-argument.css',
})
export class ProjectSpdxLicenseArgument
  implements
    CMakeComponentInterface<ProjectSpdxLicenseService>,
    CheckboxesItemInterface,
    ProjectSpdxLicenseModel
{
  service = inject(ProjectSpdxLicenseService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name: string = 'License';

  value = '';
}
