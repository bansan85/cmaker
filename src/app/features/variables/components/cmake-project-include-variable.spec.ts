import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockIPC } from '@tauri-apps/api/mocks';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CMakeProjectIncludeVariableService } from '../services/cmake-project-include-variable-service';
import { CMakeProjectIncludeVariable } from './cmake-project-include-variable';

describe('CMakeProjectIncludeVariable', () => {
  let component: CMakeProjectIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectIncludeVariable],
      providers: [
        ProjectContextService,
        CMakeProjectIncludeVariableService,
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
