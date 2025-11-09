import { Component, inject } from "@angular/core";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCompatVersionService } from "../services/project-compat-version-service";
import { FormsModule } from "@angular/forms";
import { VersionService } from "../../../shared/services/version-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { CheckboxesItemInterface } from "../../../shared/interface/checkboxes-item-interface";

@Component({
  selector: "app-project-compat-version-argument",
  imports: [FormsModule],
  templateUrl: "./project-compat-version-argument.html",
  styleUrl: "./project-compat-version-argument.css",
})
export class ProjectCompatVersionArgument
  implements
    CMakeComponentInterface<ProjectCompatVersionService>,
    CheckboxesItemInterface
{
  service = inject(ProjectCompatVersionService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
  readonly name: string = "Compat version";

  value?: Version;

  get versionString(): string {
    return this.value ? this.value.toString() : "";
  }

  set versionString(value: string) {
    if (Version.isValid(value)) {
      this.value = new Version(value);
    }
  }
}
