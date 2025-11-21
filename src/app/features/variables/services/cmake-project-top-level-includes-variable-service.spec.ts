import { TestBed } from '@angular/core/testing';

import { CMakeProjectTopLevelIncludesVariableService } from './cmake-project-top-level-includes-variable-service';

describe('CMakeProjectTopLevelIncludesVariableService', () => {
  let service: CMakeProjectTopLevelIncludesVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeProjectTopLevelIncludesVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
