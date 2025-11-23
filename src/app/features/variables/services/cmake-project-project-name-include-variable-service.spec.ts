import { TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeVariableService } from './cmake-project-project-name-include-variable-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('CMakeProjectProjectNameIncludeVariableService', () => {
  let service: CMakeProjectProjectNameIncludeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeProjectProjectNameIncludeVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(CMakeProjectProjectNameIncludeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
