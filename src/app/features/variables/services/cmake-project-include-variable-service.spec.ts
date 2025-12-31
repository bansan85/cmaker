import { TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeVariableService } from './cmake-project-include-variable-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CMakeProjectIncludeVariableService', () => {
  let service: CMakeProjectIncludeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeProjectIncludeVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(CMakeProjectIncludeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
