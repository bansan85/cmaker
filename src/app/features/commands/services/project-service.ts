import { inject, Injectable } from '@angular/core';

import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionArgument } from '../../arguments/components/project-compat-version-argument';
import { ProjectDescriptionArgument } from '../../arguments/components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../../arguments/components/project-homepage-url-argument';
import { ProjectLanguagesArgument } from '../../arguments/components/project-languages-argument';
import { ProjectNameArgument } from '../../arguments/components/project-name-argument';
import { ProjectSpdxLicenseArgument } from '../../arguments/components/project-spdx-license-argument';
import { ProjectVersionArgument } from '../../arguments/components/project-version-argument';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import {
  CMakeAvailableData,
  mergeCMakeAvailableData,
} from '../../cmake-project/interfaces/cmake-available-data';
import { CMakeCommandTyped } from '../../serializer/models/cmake-command-typed';
import { ProjectCommand } from '../components/project-command';
import { ProjectModel } from '../models/project.model';
import { CMakeCommandInterface } from './cmake-command-interface';

@Injectable({
  providedIn: null,
})
export class ProjectService extends CMakeCommandInterface<ProjectModel> {
  private readonly name = inject(ProjectNameService);
  private readonly spdxLicense = inject(ProjectSpdxLicenseService);
  private readonly version = inject(ProjectVersionService);
  private readonly compatVersion = inject(ProjectCompatVersionService);
  private readonly description = inject(ProjectDescriptionService);
  private readonly homepageUrl = inject(ProjectHomepageUrlService);
  private readonly languages = inject(ProjectLanguagesService);

  readonly cmakeMinVersion = null;

  readonly serializeCommandName = 'project';
  readonly serializeCommandParser: CMakeCommandTyped = {
    component: ProjectCommand,
    arguments: new Map([
      ['', { name: 'name', component: ProjectNameArgument }],
      ['VERSION', { name: 'version', component: ProjectVersionArgument }],
      [
        'COMPAT_VERSION',
        {
          name: 'compatVersion',
          component: ProjectCompatVersionArgument,
        },
      ],
      [
        'SPDX_LICENSE',
        { name: 'spdxLicense', component: ProjectSpdxLicenseArgument },
      ],
      [
        'DESCRIPTION',
        { name: 'description', component: ProjectDescriptionArgument },
      ],
      [
        'HOMEPAGE_URL',
        { name: 'homepageUrl', component: ProjectHomepageUrlArgument },
      ],
      ['LANGUAGES', { name: 'languages', component: ProjectLanguagesArgument }],
    ]),
  };

  isEnabled(_action: ProjectModel): boolean {
    return true;
  }

  readonly validateArgs = [
    async (action: ProjectModel): Promise<boolean> =>
      !this.name.isEnabled(action.name) ||
      (await this.name.isValid(action.name)),
    async (action: ProjectModel): Promise<boolean> =>
      action.version === undefined ||
      !this.version.isEnabled(action.version) ||
      (await this.version.isValid(action.version)),
    async (action: ProjectModel): Promise<boolean> =>
      action.compatVersion === undefined ||
      !this.compatVersion.isEnabled(action.compatVersion) ||
      (await this.compatVersion.isValid(action.compatVersion)),
    async (action: ProjectModel): Promise<boolean> =>
      action.spdxLicense === undefined ||
      !this.spdxLicense.isEnabled(action.spdxLicense) ||
      (await this.spdxLicense.isValid(action.spdxLicense)),
    async (action: ProjectModel): Promise<boolean> =>
      action.description === undefined ||
      !this.description.isEnabled(action.description) ||
      (await this.description.isValid(action.description)),
    async (action: ProjectModel): Promise<boolean> =>
      action.homepageUrl === undefined ||
      !this.homepageUrl.isEnabled(action.homepageUrl) ||
      (await this.homepageUrl.isValid(action.homepageUrl)),
    async (action: ProjectModel): Promise<boolean> =>
      action.languages === undefined ||
      !this.languages.isEnabled(action.languages) ||
      (await this.languages.isValid(action.languages)),
  ] as const;

  readonly validateArg = [] as const;

  protected cmakeRequiredVersionImpl(action: ProjectModel): Version | null {
    return this.versionService.max(
      this.name.cmakeRequiredVersion(action.name),
      action.version ? this.version.cmakeRequiredVersion(action.version) : null,
      action.compatVersion
        ? this.compatVersion.cmakeRequiredVersion(action.compatVersion)
        : null,
      action.spdxLicense
        ? this.spdxLicense.cmakeRequiredVersion(action.spdxLicense)
        : null,
      action.description
        ? this.description.cmakeRequiredVersion(action.description)
        : null,
      action.homepageUrl
        ? this.homepageUrl.cmakeRequiredVersion(action.homepageUrl)
        : null,
      action.languages
        ? this.languages.cmakeRequiredVersion(action.languages)
        : null
    );
  }

  protected cmakeObjectsImpl(action: ProjectModel): CMakeAvailableData {
    return mergeCMakeAvailableData(
      {
        variables: [
          {
            name: 'PROJECT_SOURCE_DIR',
            version: null,
          },
          {
            name: '<PROJECT-NAME>_SOURCE_DIR',
            version: null,
          },
          {
            name: 'PROJECT_BINARY_DIR',
            version: null,
          },
          {
            name: '<PROJECT-NAME>_BINARY_DIR',
            version: null,
          },
          {
            name: 'PROJECT_IS_TOP_LEVEL',
            version: new Version(3, 21),
          },
          {
            name: '<PROJECT-NAME>_IS_TOP_LEVEL',
            version: new Version(3, 21),
          },
        ],
      },
      this.name.cmakeObjects(action.name),
      action.version ? this.version.cmakeObjects(action.version) : {},
      action.compatVersion
        ? this.compatVersion.cmakeObjects(action.compatVersion)
        : {},
      action.spdxLicense
        ? this.spdxLicense.cmakeObjects(action.spdxLicense)
        : {},
      action.description
        ? this.description.cmakeObjects(action.description)
        : {},
      action.homepageUrl
        ? this.homepageUrl.cmakeObjects(action.homepageUrl)
        : {},
      action.languages ? this.languages.cmakeObjects(action.languages) : {}
    );
  }

  protected async toCMakeListTxtImpl(action: ProjectModel): Promise<string> {
    return Promise.resolve(
      `project(\n${await this.name.toCMakeListTxt(action.name)}\n${
        action.version
          ? `${await this.version.toCMakeListTxt(action.version)}\n`
          : ''
      }${
        action.compatVersion
          ? `${await this.compatVersion.toCMakeListTxt(action.compatVersion)}\n`
          : ''
      }${
        action.spdxLicense
          ? `${await this.spdxLicense.toCMakeListTxt(action.spdxLicense)}\n`
          : ''
      }${
        action.description
          ? `${await this.description.toCMakeListTxt(action.description)}\n`
          : ''
      }${
        action.homepageUrl
          ? `${await this.homepageUrl.toCMakeListTxt(action.homepageUrl)}\n`
          : ''
      }${
        action.languages
          ? `${await this.languages.toCMakeListTxt(action.languages)}\n`
          : ''
      })`
    );
  }

  toCMakerTxt(action: ProjectModel): string {
    return `project(\n${this.name.toCMakerTxt(action.name)}${
      action.version ? `${this.version.toCMakerTxt(action.version)}\n` : ''
    }${
      action.compatVersion
        ? `${this.compatVersion.toCMakerTxt(action.compatVersion)}\n`
        : ''
    }${
      action.spdxLicense
        ? `${this.spdxLicense.toCMakerTxt(action.spdxLicense)}\n`
        : ''
    }${
      action.description
        ? `${this.description.toCMakerTxt(action.description)}\n`
        : ''
    }${
      action.homepageUrl
        ? `${this.homepageUrl.toCMakerTxt(action.homepageUrl)}\n`
        : ''
    }${
      action.languages
        ? `${this.languages.toCMakerTxt(action.languages)}\n`
        : ''
    })`;
  }
}
