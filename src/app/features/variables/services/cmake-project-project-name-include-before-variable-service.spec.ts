import { TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeBeforeVariableService } from './cmake-project-project-name-include-before-variable-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('CMakeProjectProjectNameIncludeBeforeVariableService', () => {
  let service: CMakeProjectProjectNameIncludeBeforeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CMakeProjectProjectNameIncludeBeforeVariableService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(
      CMakeProjectProjectNameIncludeBeforeVariableService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
