import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectLicenseService } from "../services/project-license-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";

@Component({
  selector: "app-project-license-option",
  imports: [FormsModule],
  templateUrl: "./project-license-option.html",
  styleUrl: "./project-license-option.css",
})
export class ProjectLicenseOption implements CMakeComponentInterface<ProjectLicenseService> {
  service = inject(ProjectLicenseService);

  enabledLicense = false;
  license = "";
}
