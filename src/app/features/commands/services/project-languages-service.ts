import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectLanguagesArgument } from "../components/project-languages-argument";
import { Version } from "../../../shared/models/version";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";

@Injectable({
  providedIn: null,
})
export class ProjectLanguagesService extends CMakeFeatureInterface<ProjectLanguagesArgument> {
  cmakeMinVersion: Version | null = null;

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  isEnabled(action: ProjectLanguagesArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(_action: ProjectLanguagesArgument): boolean {
    return true;
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectLanguagesArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectLanguagesArgument
  ): CMakeAvailableData {
    return {};
  }

  protected toCMakeListTxtImpl(action: ProjectLanguagesArgument): string {
    return `LANGUAGES ${action.toString()}\n`;
  }
}
