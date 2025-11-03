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

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  license = inject(ProjectLicenseService);
  version = inject(ProjectVersionService);
  compatVersion = inject(ProjectCompatVersionService);

  cmakeMinVersion: Version = new Version(3);

  cmakeRequiredVersion(action: ProjectCommand): Version {
    return this.license
      .cmakeRequiredVersion(action.license)
      .max(this.version.cmakeRequiredVersion(action.version))
      .max(this.version.cmakeRequiredVersion(action.compatVersion));
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    return mergeCMakeAvailableData(
      mergeCMakeAvailableData(
        mergeCMakeAvailableData(
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
          this.license.cmakeObjects(action.license)
        ),
        this.version.cmakeObjects(action.version)
      ),
      this.compatVersion.cmakeObjects(action.compatVersion)
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
      ")"
    );
  }
}
