import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvokeArgs } from '@tauri-apps/api/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { MockIpc } from '../../../shared/classes/tests/mock-ipc';
import { sleep } from '../../../shared/classes/tests/timer';
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
  constructor(private fixture: ComponentFixture<TabProject>) {}
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
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    /*
    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectCompatVersionInput, versionTag, validTag } = page;

      projectCompatVersionInput.value = '4.rez';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectCompatVersionInput.value = '4.2';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBe(false);
      expect(component.versionString).toBe('4.2');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(false);
    });
    */
  });
});
