import {
  AfterViewInit,
  Component,
  effect,
  forwardRef,
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
import { ProjectModel } from '../models/project.model';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';

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
    {
      provide: CMAKE_COMPONENT_ITEM,
      useExisting: forwardRef(() => ProjectCommand),
    },
  ],
})
export class ProjectCommand
  implements
    CMakeComponentInterface<ProjectService>,
    AfterViewInit,
    ProjectModel
{
  @ViewChild('name') readonly name!: ProjectNameArgument;
  @ViewChild('spdxLicense') readonly spdxLicense!: ProjectSpdxLicenseArgument;
  @ViewChild('version') readonly version!: ProjectVersionArgument;
  @ViewChild('compatVersion')
  readonly compatVersion!: ProjectCompatVersionArgument;
  @ViewChild('description') readonly description!: ProjectDescriptionArgument;
  @ViewChild('homepageUrl') readonly homepageUrl!: ProjectHomepageUrlArgument;
  @ViewChild('languages') readonly languages!: ProjectLanguagesArgument;

  readonly service = inject(ProjectService);

  protected readonly viewInitialized = signal(false);

  ngAfterViewInit() {
    this.viewInitialized.set(true);
  }

  constructor() {
    effect(async () => {
      if (!this.viewInitialized()) {
        return;
      }
      this.isValid.set(await this.service.isValid(this));
    });
  }

  protected isValid = signal(false);
}
