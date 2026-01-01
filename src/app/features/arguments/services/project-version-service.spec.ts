import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectVersionService } from './project-version-service';

describe('ProjectVersionService', () => {
  let service: ProjectVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectVersionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
