import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectVersionModel } from '../models/project-version.model';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';

@Injectable({
  providedIn: null,
})
export class ProjectVersionService extends CMakeFeatureInterface<ProjectVersionModel> {
  readonly cmakeMinVersion: Version | null = null;

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectVersionModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectVersionModel): Promise<boolean> {
    return Promise.resolve(action.value !== undefined);
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectVersionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: ProjectVersionModel): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_VERSION',
          version: null,
        },
        {
          name: '<PROJECT-NAME>_VERSION',
          version: null,
        },
        {
          name: 'PROJECT_VERSION_MAJOR',
          version: null,
        },
        {
          name: '<PROJECT-NAME>_VERSION_MAJOR',
          version: null,
        },
        {
          name: 'PROJECT_VERSION_MINOR',
          version: null,
        },
        {
          name: '<PROJECT-NAME>_VERSION_MINOR',
          version: null,
        },
        {
          name: 'PROJECT_VERSION_PATCH',
          version: null,
        },
        {
          name: '<PROJECT-NAME>_VERSION_PATCH',
          version: null,
        },
        {
          name: 'PROJECT_VERSION_TWEAK',
          version: null,
        },
        {
          name: '<PROJECT-NAME>_VERSION_TWEAK',
          version: null,
        },
        {
          name: 'CMAKE_PROJECT_VERSION',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_VERSION_MAJOR',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_VERSION_MINOR',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_VERSION_PATCH',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_VERSION_TWEAK',
          version: new Version(3, 12),
        },
      ],
      policies: new Map<number, boolean>([[48, true]]),
    };
  }

  protected toCMakeListTxtImpl(action: ProjectVersionModel): string {
    return `VERSION ${action.value?.toString()}\n`;
  }
}
