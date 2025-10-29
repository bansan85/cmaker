import { inject, Injectable } from "@angular/core";
import { CMakeFeatureInterface } from "./cmake-feature-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCommand } from "../components/project-command";
import { CMakeAvailableData } from "../models/cmake-available-data";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectLicenseService } from "./project-license-service";

@Injectable({
  providedIn: null,
})
export class ProjectService implements CMakeFeatureInterface<ProjectCommand> {
  private readonly variable = "CRT_SHARED_LIBS";
  private readonly helpText = "Build using CRT shared libraries";

  projectLicense = inject(ProjectLicenseService);

  cmakeMinVersion(action: ProjectCommand): Version | null {
    return this.projectLicense.cmakeMinVersion(action.license);
  }

  cmakeObjects(action: ProjectCommand): CMakeAvailableData {
    return this.projectLicense.cmakeObjects(action.license);
  }

  toCMakeListTxt(action: ProjectCommand): string {
    return this.projectLicense.toCMakeListTxt(action.license);
  }
}
