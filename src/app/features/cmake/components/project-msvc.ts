import { Component, inject, ViewChild } from "@angular/core";
import { ProjectMsvcRuntime } from "./project-msvc-runtime";
import { ProjectMsvcRuntimeService } from "../services/project-msvc-runtime-service";

@Component({
  selector: "app-project-msvc",
  imports: [ProjectMsvcRuntime],
  templateUrl: "./project-msvc.html",
  styleUrl: "./project-msvc.css",
})
export class ProjectMsvc {
  private msvcRuntimeService = inject(ProjectMsvcRuntimeService);

  @ViewChild("cbMsvcRuntimeLibrary")
  cbMsvcRuntimeLibrary!: ProjectMsvcRuntime;

  toto() {
    console.log(
      this.msvcRuntimeService.cmakeMinVersion(this.cbMsvcRuntimeLibrary)
    );
    console.log(
      this.msvcRuntimeService.toCMakeListTxt(this.cbMsvcRuntimeLibrary)
    );
  }
}
