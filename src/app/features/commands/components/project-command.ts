import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  resource,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project-service';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { ProjectSpdxLicenseArgument } from '../../arguments/components/project-spdx-license-argument';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectVersionArgument } from '../../arguments/components/project-version-argument';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectCompatVersionArgument } from '../../arguments/components/project-compat-version-argument';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectDescriptionArgument } from '../../arguments/components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../../arguments/components/project-homepage-url-argument';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { CheckboxesItem } from '../../../shared/components/checkbox/checkboxes-item';
import { CheckboxesList } from '../../../shared/components/checkbox/checkboxes-list';
import { ProjectLanguagesArgument } from '../../arguments/components/project-languages-argument';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameArgument } from '../../arguments/components/project-name-argument';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { ValidTag } from '../../../shared/components/arguments/valid-tag';
import { VersionTag } from '../../../shared/components/arguments/version-tag';
import { ProjectModel } from '../models/project.model';
import { ValidatorInterface } from '../../../shared/interfaces/validator-interface';

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
export class ProjectCommand
  implements
    CMakeComponentInterface<ProjectService>,
    ProjectModel,
    ValidatorInterface
{
  enabled = true;

  private readonly nameSignal = viewChild.required<ProjectNameArgument>('name');
  private readonly spdxLicenseSignal =
    viewChild.required<ProjectSpdxLicenseArgument>('spdxLicense');
  private readonly versionSignal =
    viewChild.required<ProjectVersionArgument>('version');
  private readonly compatVersionSignal =
    viewChild.required<ProjectCompatVersionArgument>('compatVersion');
  private readonly descriptionSignal =
    viewChild.required<ProjectDescriptionArgument>('description');
  private readonly homepageUrlSignal =
    viewChild.required<ProjectHomepageUrlArgument>('homepageUrl');
  private readonly languagesSignal =
    viewChild.required<ProjectLanguagesArgument>('languages');

  get name(): ProjectNameArgument {
    return this.nameSignal();
  }
  get spdxLicense(): ProjectSpdxLicenseArgument {
    return this.spdxLicenseSignal();
  }
  get version(): ProjectVersionArgument {
    return this.versionSignal();
  }
  get compatVersion(): ProjectCompatVersionArgument {
    return this.compatVersionSignal();
  }
  get description(): ProjectDescriptionArgument {
    return this.descriptionSignal();
  }
  get homepageUrl(): ProjectHomepageUrlArgument {
    return this.homepageUrlSignal();
  }
  get languages(): ProjectLanguagesArgument {
    return this.languagesSignal();
  }

  readonly service = inject(ProjectService);

  protected readonly projectId = `project-${crypto.randomUUID()}`;

  private readonly isValidResource = resource<boolean, ProjectModel>({
    params: () => ({
      name: {
        enabled: this.name.enabled,
        text: this.name.text,
      },
      version: {
        enabled: this.version.enabled,
        version: this.version.version,
      },
      compatVersion: {
        enabled: this.compatVersion.enabled,
        version: this.compatVersion.version,
      },
      spdxLicense: {
        enabled: this.spdxLicense.enabled,
        license: this.spdxLicense.license,
      },
      description: {
        enabled: this.description.enabled,
        text: this.description.text,
      },
      homepageUrl: {
        enabled: this.homepageUrl.enabled,
        text: this.homepageUrl.text,
      },
      languages: {
        enabled: this.languages.enabled,
        languages: this.languages.languages,
      },
    }),
    loader: ({ params }) => this.service.isValid(params),
    defaultValue: false,
  });
  readonly isValid = computed(() => this.isValidResource.value());
}
