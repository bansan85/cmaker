import { TestBed } from '@angular/core/testing';

import { OptionsRootPathService } from './options-root-path-service';
import { ProjectContextService } from './project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('OptionsRootPathService', () => {
  let service: OptionsRootPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OptionsRootPathService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(OptionsRootPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
