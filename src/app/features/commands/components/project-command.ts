import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectLicenseArgument } from "./project-license-argument";
import { ProjectLicenseService } from "../services/project-license-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectVersionService } from "../services/project-version-service";
import { ProjectVersionArgument } from "./project-version-argument";
import { ProjectCompatVersionService } from "../services/project-compat-version-service";
import { ProjectCompatVersionArgument } from "./project-compat-version-argument";
import { ProjectDescriptionService } from "../services/project-description-service";
import { ProjectDescriptionArgument } from "./project-description-argument";

@Component({
  selector: "app-project-command",
  imports: [
    FormsModule,
    ProjectLicenseArgument,
    ProjectVersionArgument,
    ProjectCompatVersionArgument,
    ProjectDescriptionArgument
  ],
  templateUrl: "./project-command.html",
  styleUrl: "./project-command.css",
  providers: [
    ProjectService,
    ProjectLicenseService,
    ProjectVersionService,
    ProjectCompatVersionService,
    ProjectDescriptionService
  ],
})
export class ProjectCommand implements CMakeComponentInterface<ProjectService> {
  @ViewChild("license") license!: ProjectLicenseArgument;
  @ViewChild("version") version!: ProjectVersionArgument;
  @ViewChild("compatVersion") compatVersion!: ProjectCompatVersionArgument;
  @ViewChild("description") description!: ProjectDescriptionArgument;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);

  name: string = "";
}
