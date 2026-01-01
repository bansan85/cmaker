import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockIPC } from '@tauri-apps/api/mocks';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectService } from '../../commands/services/project-service';
import { CMakeMsvcRuntimeLibraryVariableService } from '../../variables/services/cmake-msvc-runtime-library-variable-service';
import { CMakeProjectIncludeBeforeVariableService } from '../../variables/services/cmake-project-include-before-variable-service';
import { CMakeProjectIncludeVariableService } from '../../variables/services/cmake-project-include-variable-service';
import { CMakeProjectProjectNameIncludeBeforeVariableService } from '../../variables/services/cmake-project-project-name-include-before-variable-service';
import { CMakeProjectProjectNameIncludeVariableService } from '../../variables/services/cmake-project-project-name-include-variable-service';
import { CMakeProjectTopLevelIncludesVariableService } from '../../variables/services/cmake-project-top-level-includes-variable-service';
import { ProjectContextService } from '../services/project-context-service';
import { TabProject } from './tab-project';

describe('TabProject', () => {
  let component: TabProject;
  let fixture: ComponentFixture<TabProject>;

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
    }).compileComponents();

    mockIPC((cmd, args) => {
      if (cmd === 'relative_paths_exists') {
        return true;
      }
      throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
    });

    fixture = TestBed.createComponent(TabProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
