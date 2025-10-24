import { TestBed } from '@angular/core/testing';

import { ProjectMsvcRuntimeService } from './project-msvc-runtime-service';

describe('ProjectMsvcRuntimeService', () => {
  let service: ProjectMsvcRuntimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectMsvcRuntimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
