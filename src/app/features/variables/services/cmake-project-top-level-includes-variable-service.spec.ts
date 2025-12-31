import { TestBed } from '@angular/core/testing';

import { CMakeProjectTopLevelIncludesVariableService } from './cmake-project-top-level-includes-variable-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CMakeProjectTopLevelIncludesVariableService', () => {
  let service: CMakeProjectTopLevelIncludesVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeProjectTopLevelIncludesVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(CMakeProjectTopLevelIncludesVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
