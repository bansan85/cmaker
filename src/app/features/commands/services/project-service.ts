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

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  license = inject(ProjectLicenseService);
  version = inject(ProjectVersionService);

  cmakeMinVersion: Version = new Version(3);

  cmakeRequiredVersion(action: ProjectCommand): Version {
    return this.license
      .cmakeRequiredVersion(action.license)
      .max(this.version.cmakeRequiredVersion(action.version));
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    return mergeCMakeAvailableData(
      this.license.cmakeObjects(action.license),
      this.version.cmakeObjects(action.version)
    );
  }

  toCMakeListTxt(action: ProjectCommand): string {
    return (
      "project(\n" +
      this.license.toCMakeListTxt(action.license) +
      "\n" +
      this.version.toCMakeListTxt(action.version) +
      ")"
    );
  }
}
