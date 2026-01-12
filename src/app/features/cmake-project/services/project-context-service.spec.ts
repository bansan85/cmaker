import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from './project-context-service';

describe('ProjectContextService', () => {
  let service: ProjectContextService;

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
    service = TestBed.inject(ProjectContextService);
  });

  it('should pass', () => {
    expect(service).toBeTruthy();

    service.maxCMakeVersion = new Version(1, 2, 3);
    expect(service.maxCMakeVersion.version).toStrictEqual(new Version(1, 2, 3));
    expect(service.maxCMakeVersion).toStrictEqual({
      enabled: true,
      version: new Version(1, 2, 3),
    });

    service.rootPath = 'path';
    expect(service.rootPath.directory).toStrictEqual('path');
    expect(service.rootPath).toStrictEqual({
      enabled: true,
      directory: 'path',
    });
  });

  it('should fail', () => {
    expect(service).toBeTruthy();

    service.maxCMakeVersion.version = new Version(1, 2, 3);
    expect(service.maxCMakeVersion.version).not.toStrictEqual(
      new Version(1, 2, 3)
    );

    service.rootPath.directory = 'path';
    expect(service.rootPath.directory).not.toBe('path');
  });
});
