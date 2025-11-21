import { TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeBeforeVariableService } from './cmake-project-include-before-variable-service';

describe('CMakeProjectIncludeBeforeVariableService', () => {
  let service: CMakeProjectIncludeBeforeVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeProjectIncludeBeforeVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
