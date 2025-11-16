import { inject, Injectable } from '@angular/core';
import { ProjectLicenseArgument } from '../components/project-license-argument';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';

@Injectable({
  providedIn: null,
})
export class ProjectLicenseService extends CMakeFeatureInterface<ProjectLicenseArgument> {
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(4, 2);

  isEnabled(action: ProjectLicenseArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: ProjectLicenseArgument): boolean {
    return true;
  }

  protected cmakeRequiredVersionImpl(
    action: ProjectLicenseArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    action: ProjectLicenseArgument
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
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectLicenseArgument): string {
    return `SPDX_LICENSE "${action.value}"\n`;
  }
}
