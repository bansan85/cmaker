import { AfterViewInit, Component, viewChildren } from '@angular/core';
import { ProjectCommand } from '../../commands/components/project-command';
import { CMakeMsvcRuntimeLibraryVariable } from '../../variables/components/cmake-msvc-runtime-library-variable';
import { DraggableListComponent } from '../../../shared/components/list/draggable-list';
import { DraggableItemComponent } from '../../../shared/components/list/draggable-item';
import { CommonModule } from '@angular/common';
import { CMakeProjectIncludeBeforeVariable } from '../../variables/components/cmake-project-include-before-variable';
import { CMakeProjectIncludeVariable } from '../../variables/components/cmake-project-include-variable';
import { CMakeProjectProjectNameIncludeBeforeVariable } from '../../variables/components/cmake-project-project-name-include-before-variable';
import { CMakeProjectProjectNameIncludeVariable } from '../../variables/components/cmake-project-project-name-include-variable';
import { CMakeProjectTopLevelIncludesVariable } from '../../variables/components/cmake-project-top-level-includes-variable';

@Component({
  selector: 'app-tab-project',
  imports: [
    DraggableListComponent,
    DraggableItemComponent,
    CommonModule,
    ProjectCommand,
    CMakeMsvcRuntimeLibraryVariable,
    CMakeProjectIncludeBeforeVariable,
    CMakeProjectIncludeVariable,
    CMakeProjectProjectNameIncludeBeforeVariable,
    CMakeProjectProjectNameIncludeVariable,
    CMakeProjectTopLevelIncludesVariable,
  ],
  templateUrl: './tab-project.html',
  styleUrl: './tab-project.css',
})
export class TabProject implements AfterViewInit {
  private readonly draggableItems = viewChildren(DraggableItemComponent);

  private itemsOrder!: number[];

  ngAfterViewInit() {
    this.itemsOrder = Array.from(
      { length: this.draggableItems().length },
      (_, k) => k
    );
  }

  reorderItems(event: { from: number; to: number }) {
    var element = this.itemsOrder[event.from];
    this.itemsOrder.splice(event.from, 1);
    this.itemsOrder.splice(event.to, 0, element);
  }

  toto() {
    const draggableItemsList = this.draggableItems();
    console.log('this.itemsOrder');
    console.log(this.itemsOrder);
    this.itemsOrder.forEach((i) => {
      const child = draggableItemsList[i].child;
      console.log(child.service.toCMakeListTxt(child));
    });
  }
}
