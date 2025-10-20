import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab-project",
  imports: [],
  templateUrl: "./tab-project.html",
  styleUrl: "./tab-project.css",
})
export class TabProject {
  @Input() content?: { title: string; description: string };
}
