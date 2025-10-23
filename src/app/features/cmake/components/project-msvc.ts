import { Component, inject, ViewChild } from "@angular/core";
import { UiCheckboxIndeterminate } from "../../../shared/components/ui-checkbox-indeterminate";
import { CMakeMinVersion } from "../services/cmake-min-version";

@Component({
  selector: "app-project-msvc",
  imports: [UiCheckboxIndeterminate],
  templateUrl: "./project-msvc.html",
  styleUrl: "./project-msvc.css",
})
export class ProjectMsvc {
  @ViewChild("cbMsvcRuntimeLibrary")
  cbMsvcRuntimeLibrary!: UiCheckboxIndeterminate;

  cmakeMinVersion = inject(CMakeMinVersion);

  toto() {
    console.log(this.cmakeMinVersion.get(this));
  }
}
