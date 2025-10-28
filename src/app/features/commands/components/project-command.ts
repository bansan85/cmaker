import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProjectService } from "../services/project-service";
import { CMakeProvider } from "../../cmake-project/interfaces/cmake-provider";

@Component({
  selector: "app-project-command",
  imports: [FormsModule],
  templateUrl: "./project-command.html",
  styleUrl: "./project-command.css",
  providers:[ProjectService]
})
export class ProjectCommand implements CMakeProvider {
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
