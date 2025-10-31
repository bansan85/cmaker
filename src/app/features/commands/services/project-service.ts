import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCommand } from "../components/project-command";
import { CMakeAvailableData } from "../../cmake-project/interfaces/cmake-available-data";
import { ProjectLicenseService } from "./project-license-service";

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  projectLicense = inject(ProjectLicenseService);

  cmakeMinVersion: Version = new Version("3.0");

  cmakeRequiredVersion(action: ProjectCommand): Version | null {
    return this.projectLicense.cmakeRequiredVersion(action.license);
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    return this.projectLicense.cmakeObjects(action.license);
  }

  toCMakeListTxt(action: ProjectCommand): string {
    return this.projectLicense.toCMakeListTxt(action.license);
  }
}
