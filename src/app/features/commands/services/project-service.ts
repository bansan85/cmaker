import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import {
  CMakeAvailableData,
  mergeCMakeAvailableData,
} from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: null,
})
export class ProjectService extends CMakeFeatureInterface<ProjectModel> {
  private readonly name = inject(ProjectNameService);
  private readonly spdxLicense = inject(ProjectSpdxLicenseService);
  private readonly version = inject(ProjectVersionService);
  private readonly compatVersion = inject(ProjectCompatVersionService);
  private readonly description = inject(ProjectDescriptionService);
  private readonly homepageUrl = inject(ProjectHomepageUrlService);
  private readonly languages = inject(ProjectLanguagesService);

  readonly cmakeMinVersion = null;

  isEnabled(_action: ProjectModel): boolean {
    return true;
  }

  async isValid(action: ProjectModel): Promise<boolean> {
    return Promise.resolve(
      (!this.name.isEnabled(action.name) ||
        (await this.name.isValid(action.name))) &&
        (action.version === undefined ||
          !this.version.isEnabled(action.version) ||
          (await this.version.isValid(action.version))) &&
        (action.compatVersion === undefined ||
          !this.compatVersion.isEnabled(action.compatVersion) ||
          (await this.compatVersion.isValid(action.compatVersion))) &&
        (action.spdxLicense === undefined ||
          !this.spdxLicense.isEnabled(action.spdxLicense) ||
          (await this.spdxLicense.isValid(action.spdxLicense))) &&
        (action.description === undefined ||
          !this.description.isEnabled(action.description) ||
          (await this.description.isValid(action.description))) &&
        (action.homepageUrl === undefined ||
          !this.homepageUrl.isEnabled(action.homepageUrl) ||
          (await this.homepageUrl.isValid(action.homepageUrl))) &&
        (action.languages === undefined ||
          !this.languages.isEnabled(action.languages) ||
          (await this.languages.isValid(action.languages)))
    );
  }

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
      `project(\n${await this.name.toCMakeListTxt(action.name)}${
        action.version ? await this.version.toCMakeListTxt(action.version) : ''
      }${
        action.compatVersion
          ? await this.compatVersion.toCMakeListTxt(action.compatVersion)
          : ''
      }${
        action.spdxLicense
          ? await this.spdxLicense.toCMakeListTxt(action.spdxLicense)
          : ''
      }${
        action.description
          ? await this.description.toCMakeListTxt(action.description)
          : ''
      }${
        action.homepageUrl
          ? await this.homepageUrl.toCMakeListTxt(action.homepageUrl)
          : ''
      }${
        action.languages
          ? await this.languages.toCMakeListTxt(action.languages)
          : ''
      })`
    );
  }

  toCMakerTxt(action: ProjectModel): string {
    return `project(\n${this.name.toCMakerTxt(action.name)}${
      action.version ? this.version.toCMakerTxt(action.version) : ''
    }${
      action.compatVersion
        ? this.compatVersion.toCMakerTxt(action.compatVersion)
        : ''
    }${
      action.spdxLicense ? this.spdxLicense.toCMakerTxt(action.spdxLicense) : ''
    }${
      action.description ? this.description.toCMakerTxt(action.description) : ''
    }${
      action.homepageUrl ? this.homepageUrl.toCMakerTxt(action.homepageUrl) : ''
    }${action.languages ? this.languages.toCMakerTxt(action.languages) : ''})`;
  }
}
