import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { ProjectVersionArgument } from "../components/project-version-argument";
import { Version } from "../../../shared/models/version";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";

@Injectable({
  providedIn: null,
})
export class ProjectVersionService extends CMakeFeatureInterface<ProjectVersionArgument> {
  cmakeMinVersion: Version | null = null;

  isEnabled(action: ProjectVersionArgument): boolean {
    return action.enabled;
  }

  isValid(action: ProjectVersionArgument): boolean {
    return action.value !== undefined;
  }

  protected cmakeRequiredVersionImpl(
    _action: ProjectVersionArgument
  ): Version | null {
    return this.cmakeMinVersion;
  }

  protected cmakeObjectsImpl(
    _action: ProjectVersionArgument
  ): CMakeAvailableData {
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
  }

  protected toCMakeListTxtImpl(action: ProjectVersionArgument): string {
    return `VERSION ${action.value?.toString()}\n`;
  }
}
