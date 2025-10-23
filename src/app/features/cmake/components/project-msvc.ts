import { Component, ViewChild } from "@angular/core";
import { UiCheckboxIndeterminate } from "../../../shared/components/ui-checkbox-indeterminate";
import { ProjectMsvcModel } from "../models/project-msvc-model";

@Component({
  selector: "app-project-msvc",
  imports: [UiCheckboxIndeterminate],
  templateUrl: "./project-msvc.html",
  styleUrl: "./project-msvc.css",
})
export class ProjectMsvc {
  public msvc: ProjectMsvcModel = new ProjectMsvcModel();

  constructor() { }

  @ViewChild("cbMsvcRuntimeLibrary")
  cbMsvcRuntimeLibrary!: UiCheckboxIndeterminate;

  toto() {
    console.log(this.msvc.cmakeMinVersion());
  }
}
