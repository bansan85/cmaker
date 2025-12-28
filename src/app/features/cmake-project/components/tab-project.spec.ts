import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProject } from './tab-project';
import { ProjectContextService } from '../services/project-context-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { importProvidersFrom } from '@angular/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { mockIPC } from '@tauri-apps/api/mocks';

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
