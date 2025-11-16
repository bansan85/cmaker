import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectLicenseArgument } from '../../arguments/components/project-license-argument';
import { ProjectLicenseService } from '../../arguments/services/project-license-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectVersionArgument } from '../../arguments/components/project-version-argument';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectCompatVersionArgument } from '../../arguments/components/project-compat-version-argument';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectDescriptionArgument } from '../../arguments/components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../../arguments/components/project-homepage-url-argument';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { VersionService } from '../../../shared/services/version-service';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { ProjectLanguagesArgument } from '../../arguments/components/project-languages-argument';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameArgument } from '../../arguments/components/project-name-argument';
import { ProjectNameService } from '../../arguments/services/project-name-service';

@Component({
  selector: 'app-project-command',
  imports: [
    FormsModule,
    ProjectLicenseArgument,
    ProjectVersionArgument,
    ProjectCompatVersionArgument,
    ProjectDescriptionArgument,
    ProjectHomepageUrlArgument,
    ProjectLanguagesArgument,
    ProjectNameArgument,
    CheckboxesList,
    CheckboxesItem,
  ],
  templateUrl: './project-command.html',
  styleUrl: './project-command.css',
  providers: [
    ProjectService,
    ProjectLicenseService,
    ProjectVersionService,
    ProjectCompatVersionService,
    ProjectDescriptionService,
    ProjectHomepageUrlService,
    ProjectLanguagesService,
    ProjectNameService,
  ],
})
export class ProjectCommand implements CMakeComponentInterface<ProjectService> {
  @ViewChild('name') name!: ProjectNameArgument;
  @ViewChild('license') license!: ProjectLicenseArgument;
  @ViewChild('version') version!: ProjectVersionArgument;
  @ViewChild('compatVersion') compatVersion!: ProjectCompatVersionArgument;
  @ViewChild('description') description!: ProjectDescriptionArgument;
  @ViewChild('homepageUrl') homepageUrl!: ProjectHomepageUrlArgument;
  @ViewChild('languages') languages!: ProjectLanguagesArgument;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);
}
