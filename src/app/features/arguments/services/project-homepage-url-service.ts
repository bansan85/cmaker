import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectHomepageUrlModel } from '../models/project-homepage-url.model';

@Injectable({
  providedIn: null,
})
export class ProjectHomepageUrlService extends CMakeFeatureInterface<ProjectHomepageUrlModel> {
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(3, 12);

  isEnabled(action: ProjectHomepageUrlModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectHomepageUrlModel): boolean {
    return /https?:\/\/.+/.test(action.value);
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectHomepageUrlModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectHomepageUrlModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
        {
          name: '<PROJECT-NAME>_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_HOMEPAGE_URL',
          version: new Version(3, 12),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectHomepageUrlModel): string {
    return `HOMEPAGE_URL "${action.value}"\n`;
  }
}
