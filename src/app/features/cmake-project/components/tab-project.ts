import {
  AfterViewInit,
  Component,
  inject,
  Injector,
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
import { DeserializerRegistry } from '../../serializer/services/deserializer-registry';
import { open, save } from '@tauri-apps/plugin-dialog';
import { RustBackendService } from '../../../shared/services/rust-backend-service';

@Component({
  selector: 'app-tab-project',
  imports: [DraggableListComponent, DraggableItemComponent, CommonModule],
  templateUrl: './tab-project.html',
  styleUrl: './tab-project.css',
})
export class TabProject implements AfterViewInit {
  private readonly contextInjector = inject(Injector);
  private readonly rustBackendService = inject(RustBackendService);

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
  private readonly registry = inject(DeserializerRegistry);

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

  cmakeListToConsole() {
    this.itemsOrder.forEach((i) => {
      const child = this.items[i];
      console.log(child.service.toCMakeListTxt(child));
    });
  }

  async loadFromFile() {
    const absolutePath = await open({
      multiple: false,
      directory: false,
      filters: [
        { name: 'CMake files', extensions: ['txt'] },
        { name: 'All files', extensions: ['*'] },
      ],
    });

    if (absolutePath !== null) {
      const content = await this.rustBackendService.loadFromFile(absolutePath);
      this.parse(content.split('\n'));
    }
  }

  loadFromText() {
    this.parse([
      'project(helloworld VERSION 1.0.0 LANGUAGES CXX)',
      'project(${PROJECT_NAME_FULL} VERSION ${PROJECT_VERSION_FROM_GIT} DESCRIPTION "${PROJECT_DESCRIPTION_ONELINE}" HOMEPAGE_URL "${PROJECT_HOMEPAGE_URL}" LANGUAGES ${PROJECT_LANGUAGES})',
      'set(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "toto")',
    ]);
  }

  async saveToFile() {
    const absolutePath = await save({
      filters: [
        { name: 'CMake files', extensions: ['txt'] },
        { name: 'All files', extensions: ['*'] },
      ],
    });

    if (absolutePath !== null) {
      await this.rustBackendService.saveToFile(
        absolutePath,
        this.itemsOrder
          .map((i) => {
            return this.items[i].service.toCMakeListTxt(this.items[i]);
          })
          .join('\n')
      );
    }
  }

  parse(content: string[]) {
    const retval = this.registry.parse(content, this.contextInjector);
    Array.from(Array(retval.length)).forEach((_) =>
      this.items.push(null as any)
    );

    setTimeout(() => {
      retval.forEach((x, i) => {
        const newIndex = this.items.length - retval.length + i;
        const newContainer = this.containers()[newIndex]!;
        newContainer.insert(x.hostView);
        this.items[newIndex] = x.instance;
        this.itemsOrder.push(newIndex);
      });
    });
  }
}
