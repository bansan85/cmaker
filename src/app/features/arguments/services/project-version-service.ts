import { Injectable } from '@angular/core';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectVersionService extends CMakeArgumentInterface<InputVersionModel> {
  readonly cmakeMinVersion = null;

  isEnabled(action: InputVersionModel): boolean {
    return (
      (action.enabled ?? true) &&
      (this.projectContext.maxCMakeVersion.version === undefined ||
        !this.versionService.isGreater(
          this.cmakeMinVersion,
          this.projectContext.maxCMakeVersion.version
        ))
    );
  }

  isValid(action: InputVersionModel): Promise<boolean> {
    return Promise.resolve(action.version !== undefined);
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
      policies: [
        {
          name: 'CMP0048',
          warnIfUnset: true,
          startVersion: new Version(3, 0),
          endVersion: new Version(4, 0),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: InputVersionModel): Promise<string> {
    return Promise.resolve(this.toCMakerTxt(action));
  }

  toCMakerTxt(action: InputVersionModel): string {
    return `VERSION ${action.version?.toString()}\n`;
  }
}
