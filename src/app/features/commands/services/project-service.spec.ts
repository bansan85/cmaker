import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectService } from './project-service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        ProjectSpdxLicenseService,
        ProjectContextService,
        ProjectVersionService,
        ProjectCompatVersionService,
        ProjectDescriptionService,
        ProjectHomepageUrlService,
        ProjectLanguagesService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
