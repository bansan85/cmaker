import { Directive, inject, viewChild } from '@angular/core';

import { InputInterface } from '../../../shared/interfaces/input-interface';
import { ResourceService } from '../../../shared/services/resource-service';
import { ProjectModel } from '../../commands/models/project.model';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectCompatVersionArgument } from '../components/project-compat-version-argument';
import { ProjectDescriptionArgument } from '../components/project-description-argument';
import { ProjectHomepageUrlArgument } from '../components/project-homepage-url-argument';
import { ProjectLanguagesArgument } from '../components/project-languages-argument';
import { ProjectNameArgument } from '../components/project-name-argument';
import { ProjectSpdxLicenseArgument } from '../components/project-spdx-license-argument';
import { ProjectVersionArgument } from '../components/project-version-argument';

@Directive()
export abstract class InputProject implements InputInterface<ProjectModel> {
  enabled = true;

  abstract readonly itemName: string;

  abstract readonly service: CMakeFeatureInterface<ProjectModel>;

  private readonly resourceService = inject(ResourceService);

  private readonly nameSignal = viewChild.required<ProjectNameArgument>('name');
  get name(): ProjectNameArgument {
    return this.nameSignal();
  }

  private readonly versionSignal =
    viewChild.required<ProjectVersionArgument>('version');
  get version(): ProjectVersionArgument {
    return this.versionSignal();
  }

  private readonly compatVersionSignal =
    viewChild.required<ProjectCompatVersionArgument>('compatVersion');
  get compatVersion(): ProjectCompatVersionArgument {
    return this.compatVersionSignal();
  }

  private readonly spdxLicenseSignal =
    viewChild.required<ProjectSpdxLicenseArgument>('spdxLicense');
  get spdxLicense(): ProjectSpdxLicenseArgument {
    return this.spdxLicenseSignal();
  }

  private readonly descriptionSignal =
    viewChild.required<ProjectDescriptionArgument>('description');
  get description(): ProjectDescriptionArgument {
    return this.descriptionSignal();
  }

  private readonly homepageUrlSignal =
    viewChild.required<ProjectHomepageUrlArgument>('homepageUrl');
  get homepageUrl(): ProjectHomepageUrlArgument {
    return this.homepageUrlSignal();
  }

  private readonly languagesSignal =
    viewChild.required<ProjectLanguagesArgument>('languages');
  get languages(): ProjectLanguagesArgument {
    return this.languagesSignal();
  }

  readonly isValid =
    this.resourceService.createValidationResource<ProjectModel>(
      () => ({
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
      (params) => this.service.isValid(params),
      false
    );
}
