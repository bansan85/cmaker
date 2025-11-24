import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { VersionService } from '../../../shared/services/version-service';
import { ProjectDescriptionModel } from '../models/project-description.model';

@Injectable({
  providedIn: null,
})
export class ProjectDescriptionService extends CMakeFeatureInterface<ProjectDescriptionModel> {
  readonly cmakeMinVersion: Version | null = new Version(3, 9);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectDescriptionModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: ProjectDescriptionModel): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectDescriptionModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectDescriptionModel
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: 'PROJECT_DESCRIPTION',
          version: new Version(3, 9),
        },
        {
          name: '<PROJECT-NAME>_DESCRIPTION',
          version: new Version(3, 12),
        },
        {
          name: 'CMAKE_PROJECT_DESCRIPTION',
          version: new Version(3, 9),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectDescriptionModel): string {
    return `DESCRIPTION "${action.value}"\n`;
  }
}
