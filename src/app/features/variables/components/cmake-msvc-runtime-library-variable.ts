import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CMakeMsvcRuntimeLibraryVariableService } from "../services/cmake-msvc-runtime-library-variable-service";
import { CMakeProvider } from "../../cmake-project/interfaces/cmake-provider";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

@Component({
  selector: "app-cmake-msvc-runtime-library-variable",
  imports: [FormsModule],
  templateUrl: "./cmake-msvc-runtime-library-variable.html",
  styleUrl: "./cmake-msvc-runtime-library-variable.css",
  providers: [CMakeMsvcRuntimeLibraryVariableService],
})
export class CMakeMsvcRuntimeLibraryVariable implements CMakeProvider<CMakeMsvcRuntimeLibraryVariableService> {
  service = inject(CMakeMsvcRuntimeLibraryVariableService);
  projectContext = inject(ProjectContextService);

  enabled = false;
  defaultValue = false;

  toto() {
    //  console.log(this.msvcRuntimeService.cmakeRequiredVersion(this));
    //  console.log(this.msvcRuntimeService.toCMakeListTxt(this));
  }
}
