import { Component, inject } from "@angular/core";
import { ProjectContextService } from "../services/project-context-service";
import { FormsModule } from "@angular/forms";
import { Version } from "../../../shared/models/version";

@Component({
  selector: "app-tab-options",
  imports: [FormsModule],
  templateUrl: "./tab-options.html",
  styleUrl: "./tab-options.css",
})
export class TabOptions {
  projectContext = inject(ProjectContextService);

  get versionString(): string {
    return this.projectContext.version.toString();
  }

  set versionString(value: string) {
    if (Version.isValid(value)) {
      this.projectContext.version = new Version(value);
    }
  }
}
