import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockIPC } from '@tauri-apps/api/mocks';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
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
