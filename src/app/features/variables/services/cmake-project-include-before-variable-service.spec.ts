import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { CMakeProjectIncludeBeforeVariableService } from './cmake-project-include-before-variable-service';

describe('CMakeProjectIncludeBeforeVariableService', () => {
  let service: CMakeProjectIncludeBeforeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeProjectIncludeBeforeVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(CMakeProjectIncludeBeforeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
