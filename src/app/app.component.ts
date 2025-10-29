import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { CMakeProject } from "./features/cmake-project/components/cmake-project";

@Component({
  selector: "app-root",
  imports: [CMakeProject],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
