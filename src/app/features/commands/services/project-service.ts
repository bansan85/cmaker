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
import { VersionService } from '../../../shared/services/version-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: null,
})
export class ProjectService extends CMakeFeatureInterface<ProjectModel> {
  name = inject(ProjectNameService);
  spdxLicense = inject(ProjectSpdxLicenseService);
  version = inject(ProjectVersionService);
  compatVersion = inject(ProjectCompatVersionService);
  description = inject(ProjectDescriptionService);
  homepageUrl = inject(ProjectHomepageUrlService);
  languages = inject(ProjectLanguagesService);
  dataToCMake = inject(DataToCMakeService);

  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = null;

  isEnabled(_action: ProjectModel): boolean {
    return true;
  }

  isValid(action: ProjectModel): boolean {
    return (
      (!this.name.isEnabled(action.name) || this.name.isValid(action.name)) &&
      (action.version === undefined ||
        !this.version.isEnabled(action.version) ||
        this.version.isValid(action.version)) &&
      (action.compatVersion === undefined ||
        !this.compatVersion.isEnabled(action.compatVersion) ||
        this.compatVersion.isValid(action.compatVersion)) &&
      (action.spdxLicense === undefined ||
        !this.spdxLicense.isEnabled(action.spdxLicense) ||
        this.spdxLicense.isValid(action.spdxLicense)) &&
      (action.description === undefined ||
        !this.description.isEnabled(action.description) ||
        this.description.isValid(action.description)) &&
      (action.homepageUrl === undefined ||
        !this.homepageUrl.isEnabled(action.homepageUrl) ||
        this.homepageUrl.isValid(action.homepageUrl)) &&
      (action.languages === undefined ||
        !this.languages.isEnabled(action.languages) ||
        this.languages.isValid(action.languages))
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

  protected toCMakeListTxtImpl(action: ProjectModel): string {
    return (
      'project(\n' +
      this.name.toCMakeListTxt(action.name) +
      (action.version ? this.version.toCMakeListTxt(action.version) : '') +
      (action.compatVersion
        ? this.compatVersion.toCMakeListTxt(action.compatVersion)
        : '') +
      (action.spdxLicense
        ? this.spdxLicense.toCMakeListTxt(action.spdxLicense)
        : '') +
      (action.description
        ? this.description.toCMakeListTxt(action.description)
        : '') +
      (action.homepageUrl
        ? this.homepageUrl.toCMakeListTxt(action.homepageUrl)
        : '') +
      (action.languages
        ? this.languages.toCMakeListTxt(action.languages)
        : '') +
      ')\n'
    );
  }
}
