import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockIPC } from '@tauri-apps/api/mocks';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CMakeProjectProjectNameIncludeVariable } from './cmake-project-project-name-include-variable';

describe('CMakeProjectProjectNameIncludeVariable', () => {
  let component: CMakeProjectProjectNameIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectProjectNameIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectProjectNameIncludeVariable],
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

    fixture = TestBed.createComponent(CMakeProjectProjectNameIncludeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
