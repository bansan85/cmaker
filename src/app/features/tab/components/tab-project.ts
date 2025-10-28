import { Component, inject, ViewChild } from "@angular/core";
import { ProjectCommand } from "../../commands/components/project-command";
import { CMakeMsvcRuntimeLibraryVariable } from "../../variables/components/cmake-msvc-runtime-library-variable";
import { CMakeMsvcRuntimeLibraryVariableService } from "../../variables/services/cmake-msvc-runtime-library-variable-service";
import { DraggableListComponent } from "../../../shared/components/list/draggable-list";
import { DraggableItemComponent } from "../../../shared/components/list/draggable-item";

@Component({
  selector: "app-tab-project",
  imports: [CMakeMsvcRuntimeLibraryVariable, ProjectCommand, DraggableListComponent, DraggableItemComponent],
  templateUrl: "./tab-project.html",
  styleUrl: "./tab-project.css",
})
export class TabProject {
}
