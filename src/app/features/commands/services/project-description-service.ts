import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectDescriptionArgument } from "../components/project-description-argument";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { VersionService } from "../../../shared/services/version-service";

@Injectable({
  providedIn: null,
})
export class ProjectDescriptionService extends CMakeFeatureInterface<ProjectDescriptionArgument> {
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = new Version(3, 9);

  isEnabled(action: ProjectDescriptionArgument): boolean {
    return (
      action.enabled &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  isValid(action: ProjectDescriptionArgument): boolean {
    return true;
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectDescriptionArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectDescriptionArgument
  ): CMakeAvailableData {
    return {
      variables: [
        {
          name: "PROJECT_DESCRIPTION",
          version: new Version(3, 9),
        },
        {
          name: "<PROJECT-NAME>_DESCRIPTION",
          version: new Version(3, 12),
        },
      ],
    };
  }

  protected toCMakeListTxtImpl(action: ProjectDescriptionArgument): string {
    return `DESCRIPTION "${action.value}"\n`;
  }
}
