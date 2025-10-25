import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";

@Component({
  selector: "app-project",
  imports: [FormsModule],
  templateUrl: "./project.html",
  styleUrl: "./project.css",
})
export class Project {
  private projectService = inject(ProjectService);

  enabledLicense: boolean = false;
  license:string="";

  toto() {
    console.log(
      this.projectService.cmakeMinVersion(this)
    );
    console.log(
      this.projectService.toCMakeListTxt(this)
    );
  }
}
