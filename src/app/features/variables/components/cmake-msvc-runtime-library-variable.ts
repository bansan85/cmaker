import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CMakeMsvcRuntimeLibraryVariableService } from "../services/cmake-msvc-runtime-library-variable-service";
import { CMakeProvider } from "../../cmake-project/interfaces/cmake-provider";

@Component({
  selector: "app-cmake-msvc-runtime-library-variable",
  imports: [FormsModule],
  templateUrl: "./cmake-msvc-runtime-library-variable.html",
  styleUrl: "./cmake-msvc-runtime-library-variable.css",
})
export class CMakeMsvcRuntimeLibraryVariable implements CMakeProvider {
  private msvcRuntimeService = inject(CMakeMsvcRuntimeLibraryVariableService);

  enabled: boolean = false;
  defaultValue: boolean = false;

  toto() {
    console.log(this.msvcRuntimeService.cmakeMinVersion(this));
    console.log(this.msvcRuntimeService.toCMakeListTxt(this));
  }
}
