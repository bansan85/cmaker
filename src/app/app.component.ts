import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { TabItem } from "./ui/tab-item";
import { Tabs } from "./ui/tabs";
import { Content } from "./model/content";
import { TabProject } from "./view/tab-project";
import { TabTarget } from "./view/tab-target";

@Component({
  selector: "app-root",
  imports: [TabItem, Tabs],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  tab1 = "Tab 1";
  tab2 = "Tab 2";

  content1: Content = {
    title: "First Template Title",
    description: "First Template Description",
  };
  content2: Content = {
    title: "Second Template Title",
    description: "Second Template Description",
  };

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
