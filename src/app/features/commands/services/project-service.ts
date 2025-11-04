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

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  license = inject(ProjectLicenseService);
  version = inject(ProjectVersionService);
  compatVersion = inject(ProjectCompatVersionService);
  description = inject(ProjectDescriptionService);
  homepageUrl = inject(ProjectHomepageUrlService);

  cmakeMinVersion: Version = new Version(3);

  cmakeRequiredVersion(action: ProjectCommand): Version {
    return this.license
      .cmakeRequiredVersion(action.license)
      .max(this.version.cmakeRequiredVersion(action.version))
      .max(this.compatVersion.cmakeRequiredVersion(action.compatVersion))
      .max(this.description.cmakeRequiredVersion(action.description))
      .max(this.homepageUrl.cmakeRequiredVersion(action.homepageUrl));
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    return mergeCMakeAvailableData(
      {
        variables: [
          {
            name: "PROJECT_SOURCE_DIR",
          },
          {
            name: "<PROJECT-NAME>_SOURCE_DIR",
          },
          {
            name: "PROJECT_BINARY_DIR",
          },
          {
            name: "<PROJECT-NAME>_BINARY_DIR",
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
      this.license.cmakeObjects(action.license),
      this.version.cmakeObjects(action.version),
      this.compatVersion.cmakeObjects(action.compatVersion),
      this.description.cmakeObjects(action.description),
      this.homepageUrl.cmakeObjects(action.homepageUrl)
    );
  }

  toCMakeListTxt(action: ProjectCommand): string {
    return (
      "project(\n" +
      action.name +
      "\n" +
      this.license.toCMakeListTxt(action.license) +
      "\n" +
      this.version.toCMakeListTxt(action.version) +
      "\n" +
      this.compatVersion.toCMakeListTxt(action.compatVersion) +
      "\n" +
      this.description.toCMakeListTxt(action.description) +
      "\n" +
      this.homepageUrl.toCMakeListTxt(action.homepageUrl) +
      ")"
    );
  }
}
