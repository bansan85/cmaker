import { Component, ViewChild } from "@angular/core";
import { UiCheckboxIndeterminate } from "../../../shared/components/ui-checkbox-indeterminate";

@Component({
  selector: "app-project-msvc",
  imports: [UiCheckboxIndeterminate],
  templateUrl: "./project-msvc.html",
  styleUrl: "./project-msvc.css",
})
export class ProjectMsvc {
  @ViewChild("cbMsvcRuntimeLibrary")
  cbMsvcRuntimeLibrary!: UiCheckboxIndeterminate;

  toto() {
    console.log(this.cbMsvcRuntimeLibrary.value);
  }
}
