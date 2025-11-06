import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectLicenseService } from "../services/project-license-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";

@Component({
  selector: "app-project-license-argument",
  imports: [FormsModule],
  templateUrl: "./project-license-argument.html",
  styleUrl: "./project-license-argument.css",
})
export class ProjectLicenseArgument
  implements CMakeComponentInterface<ProjectLicenseService>
{
  service = inject(ProjectLicenseService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  value = "";
}
