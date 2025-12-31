import { TestBed } from '@angular/core/testing';

import { ProjectHomepageUrlService } from './project-homepage-url-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ProjectHomepageUrlService', () => {
  let service: ProjectHomepageUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectHomepageUrlService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectHomepageUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
