import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectLicenseOption } from "./project-license-option";
import { ProjectLicenseService } from "../services/project-license-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectVersionService } from "../services/project-version-service";
import { ProjectVersionOption } from "./project-version-option";

@Component({
  selector: "app-project-command",
  imports: [FormsModule, ProjectLicenseOption, ProjectVersionOption],
  templateUrl: "./project-command.html",
  styleUrl: "./project-command.css",
  providers: [ProjectService, ProjectLicenseService, ProjectVersionService],
})
export class ProjectCommand implements CMakeComponentInterface<ProjectService> {
  @ViewChild("license") license!: ProjectLicenseOption;
  @ViewChild("version") version!: ProjectVersionOption;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);
}
