import { Component, inject } from "@angular/core";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectVersionService } from "../services/project-version-service";
import { Version } from "../../../shared/models/version";
import { FormsModule } from "@angular/forms";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { VersionService } from "../../../shared/services/version-service";

@Component({
  selector: "app-project-version-argument",
  imports: [FormsModule],
  templateUrl: "./project-version-argument.html",
  styleUrl: "./project-version-argument.css",
})
export class ProjectVersionArgument
  implements CMakeComponentInterface<ProjectVersionService>
{
  service = inject(ProjectVersionService);
  projectContext = inject(ProjectContextService);
  versionService = inject(VersionService);

  enabled = true;
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
