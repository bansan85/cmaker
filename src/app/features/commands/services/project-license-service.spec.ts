import { TestBed } from '@angular/core/testing';

import { ProjectLicenseService } from './project-license-service';

describe('ProjectLicenseService', () => {
  let service: ProjectLicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLicenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
