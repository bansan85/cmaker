import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { VersionService } from '../../../shared/services/version-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectNameService } from './project-name-service';

describe('ProjectNameService', () => {
  let service: ProjectNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        VersionService,
        DataToCMakeService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
