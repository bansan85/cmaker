import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InvokeArgs } from '@tauri-apps/api/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { MockIpc } from '../../../shared/classes/tests/mock-ipc';
import { Version } from '../../../shared/models/version';
import { StringService } from '../../../shared/services/string-service';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectService } from '../../commands/services/project-service';
import {
  StubDraggableItemComponent,
  StubDraggableListComponent,
} from '../../tests/components/stubs';
import { CMakeMsvcRuntimeLibraryVariableService } from '../../variables/services/cmake-msvc-runtime-library-variable-service';
import { CMakeProjectIncludeBeforeVariableService } from '../../variables/services/cmake-project-include-before-variable-service';
import { CMakeProjectIncludeVariableService } from '../../variables/services/cmake-project-include-variable-service';
import { CMakeProjectProjectNameIncludeBeforeVariableService } from '../../variables/services/cmake-project-project-name-include-before-variable-service';
import { CMakeProjectProjectNameIncludeVariableService } from '../../variables/services/cmake-project-project-name-include-variable-service';
import { CMakeProjectTopLevelIncludesVariableService } from '../../variables/services/cmake-project-top-level-includes-variable-service';
import { ProjectContextService } from '../services/project-context-service';
import { TabProject } from './tab-project';

class Page {
  constructor(private fixture: ComponentFixture<TabProject>) {}

  get cmakeListToConsoleButton() {
    return this.fixture.debugElement.query(
      By.css('button[name=cmake-list-to-console]')
    ).nativeElement as HTMLButtonElement;
  }

  get loadFromTextButton() {
    return this.fixture.debugElement.query(
      By.css('button[name=load-from-text]')
    ).nativeElement as HTMLButtonElement;
  }

  get saveToCMakerButton() {
    return this.fixture.debugElement.query(
      By.css('button[name=save-to-cmaker]')
    ).nativeElement as HTMLButtonElement;
  }

  get saveToCMakeListsTxtButton() {
    return this.fixture.debugElement.query(
      By.css('button[name=save-to-cmakelists-txt]')
    ).nativeElement as HTMLButtonElement;
  }

  get loadFromFileButton() {
    return this.fixture.debugElement.query(
      By.css('button[name=load-from-file]')
    ).nativeElement as HTMLButtonElement;
  }

  get allDraggableItems() {
    return this.fixture.debugElement.queryAll(By.css('app-draggable-item li'));
  }
}

describe('TabProject', () => {
  let component: TabProject;
  let fixture: ComponentFixture<TabProject>;
  let page: Page;

  let mockIpc: MockIpc;

  beforeAll(() => {
    mockIpc = new MockIpc();
    mockIpc.mockCommand('relative_paths_exists', (_args?: InvokeArgs) => true);
    mockIpc.start();
  });

  afterAll(() => {
    mockIpc.stop();
  });

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabProject],
        providers: [
          ProjectContextService,
          ProjectService,
          ProjectSpdxLicenseService,
          ProjectVersionService,
          ProjectCompatVersionService,
          ProjectDescriptionService,
          ProjectHomepageUrlService,
          ProjectLanguagesService,
          ProjectNameService,
          CMakeMsvcRuntimeLibraryVariableService,
          CMakeProjectIncludeBeforeVariableService,
          CMakeProjectIncludeVariableService,
          CMakeProjectProjectNameIncludeBeforeVariableService,
          CMakeProjectProjectNameIncludeVariableService,
          CMakeProjectTopLevelIncludesVariableService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
          importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
        ],
      })
        .overrideComponent(TabProject, {
          set: {
            imports: [
              StubDraggableListComponent,
              StubDraggableItemComponent,
              CommonModule,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(TabProject);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;
    let stringService: StringService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectCompatVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
          importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
          StringService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TabProject);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);
      stringService = TestBed.inject(StringService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.cmakeListToConsoleButton).toBeTruthy();
      expect(page.loadFromFileButton).toBeTruthy();
      expect(page.loadFromTextButton).toBeTruthy();
      expect(page.saveToCMakeListsTxtButton).toBeTruthy();
      expect(page.saveToCMakerButton).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      //const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const {
        cmakeListToConsoleButton,
        loadFromFileButton,
        loadFromTextButton,
        saveToCMakeListsTxtButton,
        saveToCMakerButton,
        allDraggableItems,
      } = page;
      cmakeListToConsoleButton.click();
      await fixture.whenStable();
      /*
      const logs = consoleSpy.mock.calls;
      expect(logs[0][0]).toBe(
        '# Invalid\nproject(\n# Invalid\n\n# Invalid\nVERSION undefined\n# Invalid\nCOMPAT_VERSION undefined\n# Invalid\nSPDX_LICENSE ""\nDESCRIPTION ""\n# Invalid\nHOMEPAGE_URL ""\nLANGUAGES NONE\n)'
      );
      expect(logs[1][0]).toBe(
        '# Windows only\noption(CMAKE_MSVC_RUNTIME_LIBRARY "Build using CRT shared libraries" ON)\n\nif(NOT CMAKE_MSVC_RUNTIME_LIBRARY)\n  cmake_policy(SET CMP0091 NEW)\n  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")\nendif()\n'
      );
      expect(logs[2][0]).toBe(
        '# Invalid\nset(CMAKE_PROJECT_INCLUDE_BEFORE "")\n'
      );
      expect(logs[3][0]).toBe('# Invalid\nset(CMAKE_PROJECT_INCLUDE "")\n');
      expect(logs[4][0]).toBe(
        '# Invalid\nset(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE "")\n'
      );
      expect(logs[5][0]).toBe(
        '# Invalid\nset(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE "")\n'
      );
      expect(logs[6][0]).toBe(
        '# Invalid\nset(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "")\n'
      );
      */
      const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer(),
      });
      allDraggableItems[0].nativeElement.dispatchEvent(dragStartEvent);
      await fixture.whenStable();
      const dragOverEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dragStartEvent.dataTransfer,
      });
      allDraggableItems[1].nativeElement.dispatchEvent(dragOverEvent);
      await fixture.whenStable();
      const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dragStartEvent.dataTransfer,
      });
      allDraggableItems[1].nativeElement.dispatchEvent(dropEvent);
      await fixture.whenStable();
      const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dragStartEvent.dataTransfer,
      });
      allDraggableItems[0].nativeElement.dispatchEvent(dragEndEvent);
      await fixture.whenStable();
      debugger;
      //return logs[0][0];
      //
    });
  });
});
