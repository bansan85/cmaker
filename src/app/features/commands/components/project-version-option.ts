import { Component, inject } from "@angular/core";
import { CMakeComponentInterface } from "../../cmake-project/interfaces/cmake-component-interface";
import { ProjectVersionService } from "../services/project-version-service";
import { Version } from "../../../shared/models/version";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-project-version-option",
  imports: [FormsModule],
  templateUrl: "./project-version-option.html",
  styleUrl: "./project-version-option.css",
})
export class ProjectVersionOption
  implements CMakeComponentInterface<ProjectVersionService>
{
  service = inject(ProjectVersionService);

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
