import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCommand } from "../components/project-command";
import {
  CMakeAvailableData,
  mergeCMakeAvailableData,
} from "../../cmake-project/interfaces/cmake-available-data";
import { ProjectLicenseService } from "./project-license-service";
import { ProjectVersionService } from "./project-version-service";
import { ProjectCompatVersionService } from "./project-compat-version-service";
import { ProjectDescriptionService } from "./project-description-service";
import { ProjectHomepageUrlService } from "./project-homepage-url-service";
import { VersionService } from "../../../shared/services/version-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  license = inject(ProjectLicenseService);
  version = inject(ProjectVersionService);
  compatVersion = inject(ProjectCompatVersionService);
  description = inject(ProjectDescriptionService);
  homepageUrl = inject(ProjectHomepageUrlService);

  private projectContext = inject(ProjectContextService);
  private versionService = inject(VersionService);

  cmakeMinVersion: Version | null = null;

  isValid(action: ProjectCommand): boolean {
    return (
      action.name.length !== 0 &&
      !this.versionService.isGreater(
        this.cmakeMinVersion,
        this.projectContext.version
      ) &&
      this.version.isValid(action.version) &&
      this.compatVersion.isValid(action.compatVersion) &&
      this.license.isValid(action.license) &&
      this.description.isValid(action.description) &&
      this.homepageUrl.isValid(action.homepageUrl)
    );
  }

  cmakeRequiredVersion(action: ProjectCommand): Version | null {
    if (this.isValid(action)) {
      return this.versionService.max(
        this.cmakeMinVersion,
        this.version.cmakeRequiredVersion(action.version),
        this.compatVersion.cmakeRequiredVersion(action.compatVersion),
        this.license.cmakeRequiredVersion(action.license),
        this.description.cmakeRequiredVersion(action.description),
        this.homepageUrl.cmakeRequiredVersion(action.homepageUrl)
      );
    } else {
      return null;
    }
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    if (this.isValid(action)) {
      return mergeCMakeAvailableData(
        {
          variables: [
            {
              name: "PROJECT_NAME",
              version: null,
            },
            {
              name: "CMAKE_PROJECT_NAME",
              version: null,
            },
            {
              name: "PROJECT_SOURCE_DIR",
              version: null,
            },
            {
              name: "<PROJECT-NAME>_SOURCE_DIR",
              version: null,
            },
            {
              name: "PROJECT_BINARY_DIR",
              version: null,
            },
            {
              name: "<PROJECT-NAME>_BINARY_DIR",
              version: null,
            },
            {
              name: "PROJECT_IS_TOP_LEVEL",
              version: new Version(3, 21),
            },
            {
              name: "<PROJECT-NAME>_IS_TOP_LEVEL",
              version: new Version(3, 21),
            },
          ],
        },
        this.version.cmakeObjects(action.version),
        this.compatVersion.cmakeObjects(action.compatVersion),
        this.license.cmakeObjects(action.license),
        this.description.cmakeObjects(action.description),
        this.homepageUrl.cmakeObjects(action.homepageUrl)
      );
    } else {
      return {};
    }
  }

  toCMakeListTxt(action: ProjectCommand): string {
    if (this.isValid(action)) {
      return (
        "project(\n" +
        action.name +
        "\n" +
        this.license.toCMakeListTxt(action.license) +
        this.version.toCMakeListTxt(action.version) +
        this.compatVersion.toCMakeListTxt(action.compatVersion) +
        this.description.toCMakeListTxt(action.description) +
        this.homepageUrl.toCMakeListTxt(action.homepageUrl) +
        ")\n"
      );
    } else {
      return "";
    }
  }
}
