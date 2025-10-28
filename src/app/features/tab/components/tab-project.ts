import { Component, Type } from "@angular/core";
import { ProjectCommand } from "../../commands/components/project-command";
import { CMakeMsvcRuntimeLibraryVariable } from "../../variables/components/cmake-msvc-runtime-library-variable";
import { DraggableListComponent } from "../../../shared/components/list/draggable-list";
import { DraggableItemComponent } from "../../../shared/components/list/draggable-item";
import { CMakeProvider } from "../../cmake-project/interfaces/cmake-provider";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-tab-project",
  imports: [DraggableListComponent, DraggableItemComponent, CommonModule],
  templateUrl: "./tab-project.html",
  styleUrl: "./tab-project.css",
})
export class TabProject {
  items: Type<CMakeProvider>[] = [
    ProjectCommand,
    CMakeMsvcRuntimeLibraryVariable,
  ];

  reorderItems(event: { from: number; to: number }) {
    [this.items[event.from], this.items[event.to]] = [
      this.items[event.to],
      this.items[event.from],
    ];
  }
}
