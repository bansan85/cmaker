import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeVariable } from './cmake-project-include-variable';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { mockIPC } from '@tauri-apps/api/mocks';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CMakeProjectIncludeVariable', () => {
  let component: CMakeProjectIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectIncludeVariable],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    mockIPC((cmd, args) => {
      if (cmd === 'relative_paths_exists') {
        return true;
      }
      throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
    });

    fixture = TestBed.createComponent(CMakeProjectIncludeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
