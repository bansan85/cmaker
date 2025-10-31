import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";
import { CMakeProvider } from "../../cmake-project/interfaces/cmake-provider";
import { ProjectLicenseOption } from "./project-license-option";
import { ProjectLicenseService } from "../services/project-license-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Component({
  selector: "app-project-command",
  imports: [FormsModule, ProjectLicenseOption],
  templateUrl: "./project-command.html",
  styleUrl: "./project-command.css",
  providers: [ProjectService, ProjectLicenseService],
})
export class ProjectCommand implements CMakeProvider<ProjectService> {
  @ViewChild("license") license!: ProjectLicenseOption;

  service = inject(ProjectService);
  projectContext = inject(ProjectContextService);

  toto() {
    console.log(this.service.cmakeRequiredVersion(this));
    console.log(this.service.toCMakeListTxt(this));
  }
}
