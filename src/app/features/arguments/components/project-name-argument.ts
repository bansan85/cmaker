import { Component, forwardRef, inject } from '@angular/core';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectNameService } from '../services/project-name-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { FormsModule } from '@angular/forms';
import { ProjectNameModel } from '../models/project-name.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

@Component({
  selector: 'app-project-name-argument',
  imports: [FormsModule],
  templateUrl: './project-name-argument.html',
  styleUrl: './project-name-argument.css',
  providers: [
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectNameArgument),
    },
  ],
})
export class ProjectNameArgument
  implements
    CMakeComponentInterface<ProjectNameService>,
    CheckboxesItemInterface,
    ProjectNameModel
{
  service = inject(ProjectNameService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name = 'Name';
  readonly projectNameId = `project-name-${crypto.randomUUID()}`;

  value = '';
}
