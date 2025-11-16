import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from './cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { ProjectCommand } from '../components/project-command';
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

@Injectable({
  providedIn: null,
})
export class ProjectService extends CMakeFeatureInterface<ProjectCommand> {
  name = inject(ProjectNameService);
  license = inject(ProjectSpdxLicenseService);
  version = inject(ProjectVersionService);
  compatVersion = inject(ProjectCompatVersionService);
  description = inject(ProjectDescriptionService);
  homepageUrl = inject(ProjectHomepageUrlService);
  languages = inject(ProjectLanguagesService);
  dataToCMake = inject(DataToCMakeService);

  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = null;

  isEnabled(_action: ProjectCommand): boolean {
    return true;
  }

  isValid(action: ProjectCommand): boolean {
    return (
      (!this.name.isEnabled(action.name) || this.name.isValid(action.name)) &&
      (!this.version.isEnabled(action.version) ||
        this.version.isValid(action.version)) &&
      (!this.compatVersion.isEnabled(action.compatVersion) ||
        this.compatVersion.isValid(action.compatVersion)) &&
      (!this.license.isEnabled(action.license) ||
        this.license.isValid(action.license)) &&
      (!this.description.isEnabled(action.description) ||
        this.description.isValid(action.description)) &&
      (!this.homepageUrl.isEnabled(action.homepageUrl) ||
        this.homepageUrl.isValid(action.homepageUrl)) &&
      (!this.languages.isEnabled(action.languages) ||
        this.languages.isValid(action.languages))
    );
  }

  protected cmakeRequiredVersionImpl(action: ProjectCommand): Version | null {
    return this.versionService.max(
      this.name.cmakeRequiredVersion(action.name),
      this.version.cmakeRequiredVersion(action.version),
      this.compatVersion.cmakeRequiredVersion(action.compatVersion),
      this.license.cmakeRequiredVersion(action.license),
      this.description.cmakeRequiredVersion(action.description),
      this.homepageUrl.cmakeRequiredVersion(action.homepageUrl),
      this.languages.cmakeRequiredVersion(action.languages)
    );
  }

  protected cmakeObjectsImpl(action: ProjectCommand): CMakeAvailableData {
    return mergeCMakeAvailableData(
      {
        variables: [
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
      this.version.cmakeObjects(action.version),
      this.compatVersion.cmakeObjects(action.compatVersion),
      this.license.cmakeObjects(action.license),
      this.description.cmakeObjects(action.description),
      this.homepageUrl.cmakeObjects(action.homepageUrl),
      this.languages.cmakeObjects(action.languages)
    );
  }

  protected toCMakeListTxtImpl(action: ProjectCommand): string {
    return (
      'project(\n' +
      this.name.toCMakeListTxt(action.name) +
      this.license.toCMakeListTxt(action.license) +
      this.version.toCMakeListTxt(action.version) +
      this.compatVersion.toCMakeListTxt(action.compatVersion) +
      this.description.toCMakeListTxt(action.description) +
      this.homepageUrl.toCMakeListTxt(action.homepageUrl) +
      this.languages.toCMakeListTxt(action.languages) +
      ')\n'
    );
  }
}
