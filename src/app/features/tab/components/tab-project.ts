import { Component, inject, ViewChild } from "@angular/core";
import { ProjectCommand } from "../../commands/components/project-command";
import { CMakeMsvcRuntimeLibraryVariable } from "../../variables/components/cmake-msvc-runtime-library-variable";
import { CMakeMsvcRuntimeLibraryVariableService } from "../../variables/services/cmake-msvc-runtime-library-variable-service";

@Component({
  selector: "app-tab-project",
  imports: [CMakeMsvcRuntimeLibraryVariable, ProjectCommand],
  templateUrl: "./tab-project.html",
  styleUrl: "./tab-project.css",
})
export class TabProject {
  private msvcRuntimeService = inject(CMakeMsvcRuntimeLibraryVariableService);

  @ViewChild("cbMsvcRuntimeLibrary")
  cbMsvcRuntimeLibrary!: CMakeMsvcRuntimeLibraryVariable;

  showCMakeMsvcRuntimeLibrary() {
    console.log(
      this.msvcRuntimeService.cmakeMinVersion(this.cbMsvcRuntimeLibrary)
    );
    console.log(
      this.msvcRuntimeService.toCMakeListTxt(this.cbMsvcRuntimeLibrary)
    );
  }
}
