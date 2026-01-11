import { CommonModule } from '@angular/common';
import { DebugElement, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InvokeArgs } from '@tauri-apps/api/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import {
  IpcLoadFromFileArgs,
  IpcSaveToFileArgs,
  MockIpc,
} from '../../../shared/classes/tests/mock-ipc';
import { dragAndDrop } from '../../../shared/classes/tests/mouse';
import {
  arrayMove,
  compareArrayString,
  sortArrayFromList,
} from '../../../shared/classes/tests/string';
import { Version } from '../../../shared/models/version';
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
  constructor(private readonly fixture: ComponentFixture<TabProject>) {}

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

  checkNthElementType(nth: number, type: string): DebugElement {
    return this.fixture.debugElement.query(
      By.css(`app-draggable-list app-draggable-item:nth-child(${nth}) ${type}`)
    );
  }
}

describe('TabProject', () => {
  let component: TabProject;
  let fixture: ComponentFixture<TabProject>;
  let page: Page;

  let mockIpc: MockIpc;
  let mockIpcDialogSave = 'cmaker.txt';
  let mockIpcDialogOpen = 'cmaker.txt';
  const mockIpcContentSaveToFile = new Map<string, string | undefined>();
  const mockIpcContentLoadFromFile = new Map<string, string>();

  beforeAll(() => {
    mockIpc = new MockIpc();
    mockIpc.mockCommand(
      'plugin:dialog|save',
      (_args?: InvokeArgs) => mockIpcDialogSave
    );
    mockIpc.mockCommand(
      'plugin:dialog|open',
      (_args?: InvokeArgs) => mockIpcDialogOpen
    );
    mockIpc.mockCommand('save_to_file', (payload?: InvokeArgs) => {
      const args = payload as unknown as IpcSaveToFileArgs;
      mockIpcContentSaveToFile.set(args.path, args.content);
    });
    mockIpc.mockCommand('load_from_file', (payload?: InvokeArgs) => {
      const args = payload as unknown as IpcLoadFromFileArgs;
      return Promise.resolve(mockIpcContentLoadFromFile.get(args.path));
    });
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
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(TabProject);
      component = fixture.componentInstance;
      page = new Page(fixture);

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

    it('should support drag and drop', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        /* Spy console */
      });

      const {
        cmakeListToConsoleButton,
        saveToCMakerButton,
        saveToCMakeListsTxtButton,
      } = page;
      let { allDraggableItems } = page;
      const expectedCMaker: string[][] = [
        [
          'project(\nVERSION undefined\nCOMPAT_VERSION undefined\nSPDX_LICENSE ""\nDESCRIPTION ""\nHOMEPAGE_URL ""\nLANGUAGES NONE\n)',
        ],
        ['cmaker_cmake_msvc_runtime_library(ON)'],
        ['set(CMAKE_PROJECT_INCLUDE_BEFORE "")'],
        ['set(CMAKE_PROJECT_INCLUDE "")'],
        ['set(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE "")'],
        ['set(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE "")'],
        ['set(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "")'],
      ];
      const expectedCMakeListsTxt: string[][] = [
        [
          '# Invalid\nproject(\n# Invalid\n\n# Invalid\nVERSION undefined\n# Invalid\nCOMPAT_VERSION undefined\n# Invalid\nSPDX_LICENSE ""\nDESCRIPTION ""\n# Invalid\nHOMEPAGE_URL ""\nLANGUAGES NONE\n)',
        ],
        [
          '# Windows only\noption(CMAKE_MSVC_RUNTIME_LIBRARY "Build using CRT shared libraries" ON)\n\nif(NOT CMAKE_MSVC_RUNTIME_LIBRARY)\n  cmake_policy(SET CMP0091 NEW)\n  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")\nendif()',
        ],
        ['# Invalid\nset(CMAKE_PROJECT_INCLUDE_BEFORE "")'],
        ['# Invalid\nset(CMAKE_PROJECT_INCLUDE "")'],
        ['# Invalid\nset(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE "")'],
        ['# Invalid\nset(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE "")'],
        ['# Invalid\nset(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "")'],
      ];
      const expectedComponentName: string[] = [
        'app-project-command',
        'app-cmake-msvc-runtime-library-variable',
        'app-cmake-project-include-before-variable',
        'app-cmake-project-include-variable',
        'app-cmake-project-project-name-include-before-variable',
        'app-cmake-project-project-name-include-variable',
        'app-cmake-project-top-level-includes-variable',
      ];
      cmakeListToConsoleButton.click();
      await fixture.whenStable();
      let logs = consoleSpy.mock.calls as string[][];
      let logPosition = 0;
      let indexes = Array.from(Array(expectedCMakeListsTxt.length).keys());
      expect(logs.length).toBe(expectedCMakeListsTxt.length);
      expect(
        compareArrayString(
          logs,
          logPosition,
          expectedCMakeListsTxt,
          0,
          expectedCMakeListsTxt.length
        )
      ).toBe(true);
      for (const [i, type] of expectedComponentName.entries()) {
        expect(page.checkNthElementType(i + 1, type)).toBeTruthy();
      }
      logPosition += expectedCMakeListsTxt.length;
      mockIpcDialogSave = 'cmaker.txt';
      saveToCMakerButton.click();
      await fixture.whenStable();
      expect(mockIpcContentSaveToFile.get(mockIpcDialogSave)).toBe(
        expectedCMaker.join('\n')
      );
      mockIpcDialogSave = 'cmakelist.txt';
      saveToCMakeListsTxtButton.click();
      await fixture.whenStable();
      expect(mockIpcContentSaveToFile.get(mockIpcDialogSave)).toBe(
        expectedCMakeListsTxt.join('\n')
      );

      const moveFromTo = async (moveFrom: number, moveTo: number) => {
        allDraggableItems = sortArrayFromList(allDraggableItems, indexes);
        indexes = Array.from(Array(expectedCMakeListsTxt.length).keys());
        dragAndDrop(
          allDraggableItems[moveFrom].nativeElement as HTMLElement,
          allDraggableItems[moveTo].nativeElement as HTMLElement
        );
        await fixture.whenStable();
        arrayMove(expectedCMakeListsTxt, indexes[moveFrom], indexes[moveTo]);
        arrayMove(expectedCMaker, indexes[moveFrom], indexes[moveTo]);
        arrayMove(expectedComponentName, indexes[moveFrom], indexes[moveTo]);
        arrayMove(indexes, indexes[moveFrom], indexes[moveTo]);
        const oldLogsLength = logs.length;
        cmakeListToConsoleButton.click();
        await fixture.whenStable();
        // eslint-disable-next-line require-atomic-updates
        logs = consoleSpy.mock.calls as string[][];
        expect(logs.length - oldLogsLength).toBe(expectedCMakeListsTxt.length);
        expect(
          compareArrayString(
            logs,
            logPosition,
            expectedCMakeListsTxt,
            0,
            expectedCMakeListsTxt.length
          )
        ).toBe(true);
        for (const [i, type] of expectedComponentName.entries()) {
          expect(page.checkNthElementType(i + 1, type)).toBeTruthy();
        }
        logPosition += expectedCMakeListsTxt.length;

        mockIpcDialogSave = 'cmaker.txt';
        saveToCMakerButton.click();
        await fixture.whenStable();
        expect(mockIpcContentSaveToFile.get(mockIpcDialogSave)).toBe(
          expectedCMaker.join('\n')
        );
        mockIpcDialogSave = 'cmakelist.txt';
        saveToCMakeListsTxtButton.click();
        await fixture.whenStable();
        expect(mockIpcContentSaveToFile.get(mockIpcDialogSave)).toBe(
          expectedCMakeListsTxt.join('\n')
        );
      };

      await moveFromTo(0, 2);
      await moveFromTo(0, 5);
      await moveFromTo(4, 1);
      await moveFromTo(3, 3);
    });

    it('should load data from file', async () => {
      const { loadFromFileButton } = page;

      const expectedCMaker = `project(\nVERSION undefined\nCOMPAT_VERSION undefined\nSPDX_LICENSE ""\nDESCRIPTION ""\nHOMEPAGE_URL ""\nLANGUAGES NONE\n)
cmaker_cmake_msvc_runtime_library(ON)
set(CMAKE_PROJECT_TOP_LEVEL_INCLUDES "")
set(CMAKE_PROJECT_INCLUDE_BEFORE "")
set(CMAKE_PROJECT_INCLUDE "")
set(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE "")
set(CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE "")`;
      const expectedComponentName: string[] = [
        'app-project-command',
        'app-cmake-msvc-runtime-library-variable',
        'app-cmake-project-top-level-includes-variable',
        'app-cmake-project-include-before-variable',
        'app-cmake-project-include-variable',
        'app-cmake-project-project-name-include-before-variable',
        'app-cmake-project-project-name-include-variable',
      ];
      mockIpcDialogOpen = 'cmaker.txt';
      mockIpcContentLoadFromFile.set(mockIpcDialogOpen, expectedCMaker);

      loadFromFileButton.click();
      await fixture.whenStable();

      for (const [i, type] of expectedComponentName.entries()) {
        expect(page.checkNthElementType(i + 1, type)).toBeTruthy();
      }
    });
  });
});
