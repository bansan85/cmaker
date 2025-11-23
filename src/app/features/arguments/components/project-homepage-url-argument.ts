import { Component, inject } from '@angular/core';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { FormsModule } from '@angular/forms';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CheckboxesItemInterface } from '../../../shared/interface/checkboxes-item-interface';
import { ProjectHomepageUrlModel } from '../models/project-homepage-url.model';

@Component({
  selector: 'app-project-homepage-url-argument',
  imports: [FormsModule],
  templateUrl: './project-homepage-url-argument.html',
  styleUrl: './project-homepage-url-argument.css',
})
export class ProjectHomepageUrlArgument
  implements
    CMakeComponentInterface<ProjectHomepageUrlService>,
    CheckboxesItemInterface,
    ProjectHomepageUrlModel
{
  service = inject(ProjectHomepageUrlService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name = 'Homepage';
  readonly projectHomepageUrlId = `project-homepage-url-${crypto.randomUUID()}`;

  value = '';
}
