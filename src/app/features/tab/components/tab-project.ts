import { Component } from "@angular/core";
import { ProjectMsvc } from "../../cmake/components/project-msvc";
import { Project } from "../../cmake/components/project";

@Component({
  selector: "app-tab-project",
  imports: [Project, ProjectMsvc],
  templateUrl: "./tab-project.html",
  styleUrl: "./tab-project.css",
})
export class TabProject {
}
