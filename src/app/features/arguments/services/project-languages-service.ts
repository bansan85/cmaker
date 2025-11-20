import { inject, Injectable } from '@angular/core';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { VersionService } from '../../../shared/services/version-service';
import { CMakeAvailableData } from '../../cmake-project/interfaces/cmake-available-data';
import { ProjectLanguagesModel } from '../models/project-languages.model';

@Injectable({
  providedIn: null,
})
export class ProjectLanguagesService extends CMakeFeatureInterface<ProjectLanguagesModel> {
  cmakeMinVersion: Version | null = null;

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectLanguagesModel): boolean {
    return (
      (action.enabled ?? true) &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: ProjectLanguagesModel): boolean {
    return true;
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectLanguagesModel
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectLanguagesModel
  ): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(action: ProjectLanguagesModel): string {
    return `LANGUAGES ${action.toString()}\n`;
  }
}
