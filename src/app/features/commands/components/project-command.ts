import {
  Component,
  effect,
  forwardRef,
  inject,
  signal,
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
import { InputProjectCommand } from '../directives/input-project-command';

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
})
export class ProjectCommand
  extends InputProjectCommand
  implements CMakeComponentInterface<ProjectService>
{
  private readonly _name = viewChild.required<ProjectNameArgument>('name');
  private readonly _spdxLicense =
    viewChild.required<ProjectSpdxLicenseArgument>('spdxLicense');
  private readonly _version =
    viewChild.required<ProjectVersionArgument>('version');
  private readonly _compatVersion =
    viewChild.required<ProjectCompatVersionArgument>('compatVersion');
  private readonly _description =
    viewChild.required<ProjectDescriptionArgument>('description');
  private readonly _homepageUrl =
    viewChild.required<ProjectHomepageUrlArgument>('homepageUrl');
  private readonly _languages =
    viewChild.required<ProjectLanguagesArgument>('languages');

  get name(): ProjectNameArgument {
    return this._name();
  }
  get spdxLicense(): ProjectSpdxLicenseArgument {
    return this._spdxLicense();
  }
  get version(): ProjectVersionArgument {
    return this._version();
  }
  get compatVersion(): ProjectCompatVersionArgument {
    return this._compatVersion();
  }
  get description(): ProjectDescriptionArgument {
    return this._description();
  }
  get homepageUrl(): ProjectHomepageUrlArgument {
    return this._homepageUrl();
  }
  get languages(): ProjectLanguagesArgument {
    return this._languages();
  }

  readonly service = inject(ProjectService);

  protected readonly projectId = `project-${crypto.randomUUID()}`;

  constructor() {
    super();
    effect(async () => {
      this.isValid.set(await this.service.isValid(this));
    });
  }
}
