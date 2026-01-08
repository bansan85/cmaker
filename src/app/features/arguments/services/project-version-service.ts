import { inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { CMakeArgumentInterface } from '../../commands/services/cmake-argument-interface';

@Injectable({
  providedIn: null,
})
export class ProjectVersionService extends CMakeArgumentInterface<InputVersionModel> {
  readonly cmakeMinVersion = null;

  private readonly dataToCMake = inject(DataToCMakeService);

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

  readonly validateArgs = [
    (action: InputVersionModel): Promise<boolean> =>
      Promise.resolve(action.version !== undefined),
  ] as const;

  readonly validateArg = [
    (
      control: AbstractControl<string, string>,
      _context: InputVersionModel
    ): Promise<boolean> =>
      this.validateArgs[0]({
        version: this.dataToCMake.stringToVersion(control.value),
      }),
  ] as const;

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
    return `VERSION ${action.version?.toString()}`;
  }
}
