import {
  AfterViewInit,
  Component,
  inject,
  Injector,
  Type,
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

  readonly containers = viewChildren('container', { read: ViewContainerRef });

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

  protected items: (CMakeComponentInterface<
    CMakeFeatureInterface<unknown>
  > | null)[] = new Array<CMakeComponentInterface<
    CMakeFeatureInterface<unknown>
  > | null>(this.defaultInitialFields.length);

  private itemsOrder!: number[];
  private readonly registry = inject(DeserializerRegistry);

  ngAfterViewInit() {
    for (const [index, container] of this.containers().entries()) {
      this.items[index] = container.createComponent(
        this.defaultInitialFields[index]
      ).instance;
    }
    this.itemsOrder = Array.from({ length: this.items.length }, (_, k) => k);
  }

  reorderItems(event: { from: number; to: number }) {
    const element = this.itemsOrder[event.from];
    this.itemsOrder.splice(event.from, 1);
    this.itemsOrder.splice(event.to, 0, element);
  }

  async cmakeListToConsole() {
    const promises = this.itemsOrder.map((i) => {
      const child = this.items[i];
      if (child === null) {
        return Promise.resolve('null');
      }
      return child.service.toCMakeListTxt(child);
    });

    const results = await Promise.all(promises);
    results.forEach((result) => {
      console.log(result);
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
      // eslint-disable-next-line no-template-curly-in-string
      'project(${PROJECT_NAME_FULL} VERSION ${PROJECT_VERSION_FROM_GIT} DESCRIPTION "${PROJECT_DESCRIPTION_ONELINE}" HOMEPAGE_URL "${PROJECT_HOMEPAGE_URL}" LANGUAGES ${PROJECT_LANGUAGES})',
      'set(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "toto")',
    ]);
  }

  async saveToCMakeListsTxt() {
    const absolutePath = await save({
      filters: [
        { name: 'CMake files', extensions: ['txt'] },
        { name: 'All files', extensions: ['*'] },
      ],
    });

    if (absolutePath !== null) {
      await this.rustBackendService.saveToFile(
        absolutePath,
        (
          await Promise.all(
            this.itemsOrder.map(async (i) => {
              const item = this.items[i];
              if (item === null) {
                return Promise.resolve('null');
              }
              return await item.service.toCMakeListTxt(item);
            })
          )
        ).join('\n')
      );
    }
  }

  async saveToCMaker() {
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
            const item = this.items[i];
            if (item === null) {
              return Promise.resolve('null');
            }
            return item.service.toCMakerTxt(item);
          })
          .filter((i) => i !== undefined)
          .join('\n')
      );
    }
  }

  parse(content: string[]) {
    const retval = this.registry.parse(content, this.contextInjector);
    for (const _ of retval) {
      this.items.push(null);
    }

    setTimeout(() => {
      for (const [i, x] of retval.entries()) {
        const newIndex = this.items.length - retval.length + i;
        const newContainer = this.containers()[newIndex];
        newContainer.insert(x.hostView);
        this.items[newIndex] = x.instance;
        this.itemsOrder.push(newIndex);
      }
    });
  }
}
