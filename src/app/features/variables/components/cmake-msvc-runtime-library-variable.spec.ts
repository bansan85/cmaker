import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CMakeMsvcRuntimeLibraryVariableService } from '../services/cmake-msvc-runtime-library-variable-service';
import { CMakeMsvcRuntimeLibraryVariable } from './cmake-msvc-runtime-library-variable';

describe('CMakeMsvcRuntimeLibraryVariable', () => {
  let component: CMakeMsvcRuntimeLibraryVariable;
  let fixture: ComponentFixture<CMakeMsvcRuntimeLibraryVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        CMakeMsvcRuntimeLibraryVariableService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeMsvcRuntimeLibraryVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
