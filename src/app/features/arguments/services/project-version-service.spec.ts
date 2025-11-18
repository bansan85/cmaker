import { TestBed } from '@angular/core/testing';

import { ProjectVersionService } from './project-version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

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
