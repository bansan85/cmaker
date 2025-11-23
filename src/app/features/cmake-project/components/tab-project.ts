import {
  AfterViewInit,
  Component,
  QueryList,
  Type,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ProjectCommand } from '../../commands/components/project-command';
import { CMakeMsvcRuntimeLibraryVariable } from '../../variables/components/cmake-msvc-runtime-library-variable';
import { DraggableListComponent } from '../../../shared/components/list/draggable-list';
import { DraggableItemComponent } from '../../../shared/components/list/draggable-item';
import { CMakeComponentInterface } from '../../cmake-project/interfaces/cmake-component-interface';
import { CommonModule } from '@angular/common';
import { CMakeFeatureInterface } from '../../commands/services/cmake-feature-interface';
import { CMakeProjectIncludeBeforeVariable } from '../../variables/components/cmake-project-include-before-variable';
import { CMakeProjectIncludeVariable } from '../../variables/components/cmake-project-include-variable';
import { CMakeProjectProjectNameIncludeBeforeVariable } from '../../variables/components/cmake-project-project-name-include-before-variable';

@Component({
  selector: 'app-tab-project',
  imports: [DraggableListComponent, DraggableItemComponent, CommonModule],
  templateUrl: './tab-project.html',
  styleUrl: './tab-project.css',
})
export class TabProject implements AfterViewInit {
  items: Type<CMakeComponentInterface<CMakeFeatureInterface<any>>>[] = [
    ProjectCommand,
    CMakeMsvcRuntimeLibraryVariable,
    CMakeProjectIncludeBeforeVariable,
    CMakeProjectIncludeVariable,
    CMakeProjectProjectNameIncludeBeforeVariable,
  ];

  @ViewChildren('container', { read: ViewContainerRef })
  containers!: QueryList<ViewContainerRef>;
  container!: ViewContainerRef;
  private instances: CMakeComponentInterface<CMakeFeatureInterface<any>>[] = [];

  ngAfterViewInit() {
    this.instances = [];
    const containers = this.containers.toArray();
    containers.forEach((vcRef, i) => {
      vcRef.clear();
      const ref = vcRef.createComponent(this.items[i]);
      this.instances.push(ref.instance);
    });
  }

  reorderItems(event: { from: number; to: number }) {
    [this.items[event.from], this.items[event.to]] = [
      this.items[event.to],
      this.items[event.from],
    ];
    [this.instances[event.from], this.instances[event.to]] = [
      this.instances[event.to],
      this.instances[event.from],
    ];
  }

  toto() {
    console.log(this.instances);
    this.instances.forEach((i) => {
      console.log(i.service.cmakeRequiredVersion(i));
      console.log(i.service.toCMakeListTxt(i));
    });
  }
}
