import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CMakeMsvcRuntimeLibraryVariableService } from './cmake-msvc-runtime-library-variable-service';

describe('CMakeMsvcRuntimeLibraryVariableService', () => {
  let service: CMakeMsvcRuntimeLibraryVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeMsvcRuntimeLibraryVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(CMakeMsvcRuntimeLibraryVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
