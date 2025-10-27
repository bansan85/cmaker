import { Component, inject, Input, OnInit } from "@angular/core";
import { Tabs } from "../../../tab/components/tabs";
import { TabItem } from "../../../tab/components/tab-item";
import { TabProject } from "../../../tab/components/tab-project";
import { TabTarget } from "../../../target/components/target";
import { ProjectContextService } from "../../services/project-context-service";

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

  @Input() version = "v3";

  context = inject(ProjectContextService);

  ngOnInit() {
    console.log(this.version);
    this.context.version = this.version;
  }
}
