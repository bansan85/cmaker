import {
  AfterViewInit,
  Component,
  Type,
  viewChild,
  viewChildren,
  ViewContainerRef,
} from '@angular/core';
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
import { CMakeComponentInterface } from '../interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';

@Component({
  selector: 'app-tab-project',
  imports: [DraggableListComponent, DraggableItemComponent, CommonModule],
  templateUrl: './tab-project.html',
  styleUrl: './tab-project.css',
})
export class TabProject implements AfterViewInit {
  containers = viewChildren('container', { read: ViewContainerRef });

  defaultInitialFields: Type<
    CMakeComponentInterface<CMakeFeatureInterface<unknown>>
  >[] = [
    ProjectCommand,
    CMakeMsvcRuntimeLibraryVariable,
    CMakeProjectIncludeBeforeVariable,
    CMakeProjectIncludeVariable,
    CMakeProjectProjectNameIncludeBeforeVariable,
    CMakeProjectProjectNameIncludeVariable,
    CMakeProjectTopLevelIncludesVariable,
  ];

  protected items: CMakeComponentInterface<CMakeFeatureInterface<unknown>>[] =
    new Array(this.defaultInitialFields.length);

  private itemsOrder!: number[];

  ngAfterViewInit() {
    this.containers().forEach((container, index) => {
      this.items[index] = container.createComponent(
        this.defaultInitialFields[index]
      ).instance;
    });
    this.itemsOrder = Array.from({ length: this.items.length }, (_, k) => k);
  }

  reorderItems(event: { from: number; to: number }) {
    var element = this.itemsOrder[event.from];
    this.itemsOrder.splice(event.from, 1);
    this.itemsOrder.splice(event.to, 0, element);
  }

  toto() {
    const draggableItemsList = this.containers;
    console.log('this.itemsOrder');
    console.log(this.itemsOrder);
    this.itemsOrder.forEach((i) => {
      const child = this.items[i];
      console.log(child.service.toCMakeListTxt(child));
    });
  }

  add() {
    this.items.push(null as any);
    setTimeout(() => {
      const newIndex = this.items.length - 1;
      const newContainer = this.containers()[newIndex]!;
      this.items[newIndex] = newContainer.createComponent(
        CMakeProjectIncludeVariable
      ).instance;
      this.itemsOrder.push(newIndex);
    });
  }
}
