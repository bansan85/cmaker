import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCompatVersionService } from './project-compat-version-service';

describe('ProjectCompatVersionService', () => {
  let service: ProjectCompatVersionService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectCompatVersionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectCompatVersionService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support missing optional fields', async () => {
    const action: InputVersionModel = {};
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toStrictEqual(
      new Version(4, 1)
    );
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      '# Invalid\nCOMPAT_VERSION undefined'
    );
    expect(service.toCMakerTxt(action)).toBe('COMPAT_VERSION undefined');
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe('COMPAT_VERSION undefined');

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(false);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.version = new Version(1, 2, 3, 4);
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('COMPAT_VERSION 1.2.3.4');
    expect(service.toCMakerTxt(action)).toBe('COMPAT_VERSION 1.2.3.4');
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
