import { Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';

@Injectable({
  providedIn: null,
})
export class ProjectVersionService extends CMakeFeatureInterface<InputVersionModel> {
  readonly cmakeMinVersion = null;

  isEnabled(action: InputVersionModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: InputVersionModel): Promise<boolean> {
    return Promise.resolve(action.value !== undefined);
  }

  protected cmakeRequiredVersionImpl(
    _action: InputVersionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(_action: InputVersionModel): CMakeAvailableData {
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

  protected toCMakeListTxtImpl(action: InputVersionModel): string {
    return `VERSION ${action.value?.toString()}\n`;
  }
}
