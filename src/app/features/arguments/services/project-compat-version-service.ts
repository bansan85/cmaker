import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCompatVersionModel } from '../models/project-compat-version.model';

@Injectable({
  providedIn: null,
})
export class ProjectCompatVersionService extends CMakeFeatureInterface<ProjectCompatVersionModel> {
  readonly cmakeMinVersion: Version | null = new Version(4, 1);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectCompatVersionModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectCompatVersionModel): Promise<boolean> {
    return Promise.resolve(action.value !== undefined);
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectCompatVersionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectCompatVersionModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
        {
          name: '<PROJECT-NAME>_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
        {
          name: 'CMAKE_COMPAT_VERSION',
          version: this.cmakeMinVersion,
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectCompatVersionModel): string {
    return `COMPAT_VERSION ${action.value?.toString()}\n`;
  }
}
