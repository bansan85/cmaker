import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { OptionsRootPathService } from './options-root-path-service';
import { ProjectContextService } from './project-context-service';

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
