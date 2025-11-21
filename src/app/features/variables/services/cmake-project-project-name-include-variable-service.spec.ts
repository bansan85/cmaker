import { TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeVariableService } from './cmake-project-project-name-include-variable-service';

describe('CMakeProjectProjectNameIncludeVariableService', () => {
  let service: CMakeProjectProjectNameIncludeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeProjectProjectNameIncludeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
