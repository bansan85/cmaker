import { Component, inject } from "@angular/core";
import { ProjectDescriptionService } from "../services/project-description-service";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { FormsModule } from "@angular/forms";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";
import { CheckboxesItemInterface } from "../../../shared/interface/checkboxes-item-interface";

@Component({
  selector: "app-project-description-argument",
  imports: [FormsModule],
  templateUrl: "./project-description-argument.html",
  styleUrl: "./project-description-argument.css",
})
export class ProjectDescriptionArgument
  implements
    CMakeComponentInterface<ProjectDescriptionService>,
    CheckboxesItemInterface
{
  service = inject(ProjectDescriptionService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name: string = "Description";

  value = "";
}
