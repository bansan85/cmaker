import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeBeforeVariable } from './cmake-project-project-name-include-before-variable';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { mockIPC } from '@tauri-apps/api/mocks';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CMakeProjectProjectNameIncludeBeforeVariable', () => {
  let component: CMakeProjectProjectNameIncludeBeforeVariable;
  let fixture: ComponentFixture<CMakeProjectProjectNameIncludeBeforeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectProjectNameIncludeBeforeVariable],
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

    fixture = TestBed.createComponent(
      CMakeProjectProjectNameIncludeBeforeVariable
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
