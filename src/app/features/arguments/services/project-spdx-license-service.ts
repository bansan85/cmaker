import { inject, Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectSpdxLicenseModel } from '../models/project-spdx-license.model';

@Injectable({
  providedIn: null,
})
export class ProjectSpdxLicenseService extends CMakeFeatureInterface<ProjectSpdxLicenseModel> {
  readonly cmakeMinVersion: Version | null = new Version(4, 2);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectSpdxLicenseModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: ProjectSpdxLicenseModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    action: ProjectSpdxLicenseModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    action: ProjectSpdxLicenseModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
        {
          name: '<PROJECT-NAME>_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
        {
          name: 'CMAKE_PROJECT_SPDX_LICENSE',
          version: this.cmakeMinVersion,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectSpdxLicenseModel): string {
    return `SPDX_LICENSE "${action.value}"\n`;
  }
}
