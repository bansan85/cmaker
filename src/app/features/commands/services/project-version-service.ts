import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectVersionArgument } from "../components/project-version-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";

@Injectable({
  providedIn: null,
})
export class ProjectVersionService
  implements CMakeFeatureInterface<ProjectVersionArgument>
{
  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = null;

  isValid(action: ProjectVersionArgument): boolean {
    return (
      action.enabled &&
      action.value !== undefined &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      )
    );
  }

  cmakeRequiredVersion(action: ProjectVersionArgument): Version | null {
    if (this.isValid(action)) {
      return this.cmakeMinVersion;
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectVersionArgument): CMakeAvailableData {
    if (this.isValid(action)) {
      return {
        variables: [
          {
            name: "PROJECT_VERSION",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION",
            version: null,
          },
          {
            name: "PROJECT_VERSION_MAJOR",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_MAJOR",
            version: null,
          },
          {
            name: "PROJECT_VERSION_MINOR",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_MINOR",
            version: null,
          },
          {
            name: "PROJECT_VERSION_PATCH",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_PATCH",
            version: null,
          },
          {
            name: "PROJECT_VERSION_TWEAK",
            version: null,
          },
          {
            name: "<PROJECT-NAME>_VERSION_TWEAK",
            version: null,
          },
          {
            name: "CMAKE_PROJECT_VERSION",
            version: new Version(3, 12),
          },
        ],
        policies: new Map<number, boolean>([[48, true]]),
      };
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectVersionArgument): string {
    if (this.isValid(action)) {
      return `VERSION ${action.value!.toString()}\n`;
    } else {
      return "";
    }
  }
}
