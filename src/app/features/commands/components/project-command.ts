import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectSpdxLicenseArgument } from '../../arguments/components/project-spdx-license-argument';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
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
    ProjectSpdxLicenseArgument,
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
    ProjectSpdxLicenseService,
    ProjectVersionService,
    ProjectCompatVersionService,
    ProjectDescriptionService,
    ProjectHomepageUrlService,
    ProjectLanguagesService,
    ProjectNameService,
  ],
})
export class ProjectCommand
  implements CMakeComponentInterface<ProjectService>, AfterViewInit
{
  @ViewChild('name') name!: ProjectNameArgument;
  @ViewChild('spdxLicense') license!: ProjectSpdxLicenseArgument;
  @ViewChild('version') version!: ProjectVersionArgument;
  @ViewChild('compatVersion') compatVersion!: ProjectCompatVersionArgument;
  @ViewChild('description') description!: ProjectDescriptionArgument;
  @ViewChild('homepageUrl') homepageUrl!: ProjectHomepageUrlArgument;
  @ViewChild('languages') languages!: ProjectLanguagesArgument;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  viewInitialized = signal(false);

  ngAfterViewInit() {
    this.viewInitialized.set(true);
  }
}
