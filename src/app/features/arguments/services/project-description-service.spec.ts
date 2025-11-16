import { TestBed } from '@angular/core/testing';

import { ProjectDescriptionService } from './project-description-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectDescriptionService', () => {
  let service: ProjectDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectDescriptionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
