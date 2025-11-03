import { Component, inject } from "@angular/core";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { Version } from "../../../shared/models/version";
import { ProjectCompatVersionService } from "../services/project-compat-version-service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-project-compat-version-argument",
  imports: [FormsModule],
  templateUrl: "./project-compat-version-argument.html",
  styleUrl: "./project-compat-version-argument.css",
})
export class ProjectCompatVersionArgument
  implements CMakeComponentInterface<ProjectCompatVersionService>
{
  service = inject(ProjectCompatVersionService);

  enabled = false;
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
