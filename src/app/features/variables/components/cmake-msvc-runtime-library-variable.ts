import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-cmake-msvc-runtime-library-variable",
  imports: [FormsModule],
  templateUrl: "./cmake-msvc-runtime-library-variable.html",
  styleUrl: "./cmake-msvc-runtime-library-variable.css",
})
export class CMakeMsvcRuntimeLibraryVariable {
  enabled: boolean = false;
  defaultValue: boolean = false;
}
