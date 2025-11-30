import { TestBed } from '@angular/core/testing';

import { FullProjectService } from './full-project-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('FullProjectService', () => {
  let service: FullProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(FullProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
