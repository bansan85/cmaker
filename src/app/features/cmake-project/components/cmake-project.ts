import { Component, inject, Input, OnInit } from "@angular/core";
import { Tabs } from "../../tab/components/tabs";
import { TabItem } from "../../tab/components/tab-item";
import { ProjectContextService } from "../services/project-context-service";
import { TabProject } from "./tab-project";
import { TabTarget } from "./tab-target";

@Component({
  selector: "app-cmake-project",
  imports: [Tabs, TabItem],
  templateUrl: "./cmake-project.html",
  styleUrl: "./cmake-project.css",
  providers: [ProjectContextService],
})
export class CMakeProject implements OnInit {
  tabProject = TabProject;
  tabTarget = TabTarget;

  context = inject(ProjectContextService);

  ngOnInit() {
    this.context.version = "v3";
  }
}
