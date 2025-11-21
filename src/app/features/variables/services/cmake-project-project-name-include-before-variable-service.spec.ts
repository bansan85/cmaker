import { TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeBeforeVariableService } from './cmake-project-project-name-include-before-variable-service';

describe('CMakeProjectProjectNameIncludeBeforeVariableService', () => {
  let service: CMakeProjectProjectNameIncludeBeforeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(
      CMakeProjectProjectNameIncludeBeforeVariableService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
