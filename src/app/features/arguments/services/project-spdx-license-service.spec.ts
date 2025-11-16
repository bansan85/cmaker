import { TestBed } from '@angular/core/testing';

import { ProjectSpdxLicenseService } from './project-spdx-license-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';

describe('ProjectLicenseService', () => {
  let service: ProjectSpdxLicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectSpdxLicenseService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectSpdxLicenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
