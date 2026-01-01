import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockIPC } from '@tauri-apps/api/mocks';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../services/project-context-service';
import { CMakeProject } from './cmake-project';

describe('CMakeProject', () => {
  let component: CMakeProject;
  let fixture: ComponentFixture<CMakeProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProject],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
        importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
      ],
    }).compileComponents();

    mockIPC((cmd, args) => {
      if (cmd === 'path_exists') {
        return true;
      }
      if (cmd === 'relative_paths_exists') {
        return true;
      }
      throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
    });

    fixture = TestBed.createComponent(CMakeProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
