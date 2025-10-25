import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-project-msvc-runtime",
  imports: [FormsModule],
  templateUrl: "./project-msvc-runtime.html",
  styleUrl: "./project-msvc-runtime.css",
})
export class ProjectMsvcRuntime {
  enabled: boolean = false;
  defaultValue: boolean = false;
}
