import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { TabItem } from "./features/tab/components/tab-item";
import { Tabs } from "./features/tab/components/tabs";
import { TabProject } from "./features/project/components/tab-project";
import { TabTarget } from "./features/target/components/target";

@Component({
  selector: "app-root",
  imports: [TabItem, Tabs],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  tab1 = "Tab 1";
  tab2 = "Tab 2";

  tabProject = TabProject;
  tabTarget = TabTarget;

  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
