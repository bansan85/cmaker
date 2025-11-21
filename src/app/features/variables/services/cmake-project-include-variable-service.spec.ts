import { TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeVariableService } from './cmake-project-include-variable-service';

describe('CMakeProjectIncludeVariableService', () => {
  let service: CMakeProjectIncludeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeProjectIncludeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
