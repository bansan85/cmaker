import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectCompatVersionArgument } from '../components/project-compat-version-argument';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';

@Injectable({
  providedIn: null,
})
export class ProjectCompatVersionService extends CMakeFeatureInterface<ProjectCompatVersionArgument> {
  cmakeMinVersion: Version | null = new Version(4, 1);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectCompatVersionArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectCompatVersionArgument): boolean {
    return action.value !== undefined;
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectCompatVersionArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectCompatVersionArgument
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
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectCompatVersionArgument): string {
    return `COMPAT_VERSION ${action.value?.toString()}\n`;
  }
}
