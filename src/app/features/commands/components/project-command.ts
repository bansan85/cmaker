import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { ProjectCompatVersionArgument } from '../../arguments/components/project-compat-version-argument';
import { ProjectDescriptionArgument } from '../../arguments/components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../../arguments/components/project-homepage-url-argument';
import { ProjectLanguagesArgument } from '../../arguments/components/project-languages-argument';
import { ProjectNameArgument } from '../../arguments/components/project-name-argument';
import { ProjectSpdxLicenseArgument } from '../../arguments/components/project-spdx-license-argument';
import { ProjectVersionArgument } from '../../arguments/components/project-version-argument';
import { InputProject } from '../../arguments/directives/input-project';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectService } from '../services/project-service';

@Component({
  selector: 'app-project-command',
  imports: [
    FormsModule,
    ProjectSpdxLicenseArgument,
    ProjectVersionArgument,
    ProjectCompatVersionArgument,
    ProjectDescriptionArgument,
    ProjectHomepageUrlArgument,
    ProjectLanguagesArgument,
    ProjectNameArgument,
    CheckboxesList,
    CheckboxesItem,
    ValidTag,
    VersionTag,
  ],
  templateUrl: './project-command.html',
  styleUrl: './project-command.css',
  providers: [
    ProjectService,
    ProjectSpdxLicenseService,
    ProjectVersionService,
    ProjectCompatVersionService,
    ProjectDescriptionService,
    ProjectHomepageUrlService,
    ProjectLanguagesService,
    ProjectNameService,
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectCommand),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCommand extends InputProject {
  readonly itemName = 'Project';

  protected readonly projectId = `project-${crypto.randomUUID()}`;

  readonly service = inject(ProjectService);
}
