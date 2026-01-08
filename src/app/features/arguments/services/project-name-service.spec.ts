import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { Version } from '../../../shared/models/version';
import { VersionService } from '../../../shared/services/version-service';
import { DataToCMakeService } from '../../cmake-project/services/data-to-cmake-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectNameService } from './project-name-service';

describe('ProjectNameService', () => {
  let service: ProjectNameService;
  let projectContext: ProjectContextService;

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
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support missing optional fields', async () => {
    const action: InputStringModel = { text: 'Wrong Name' };
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('# Invalid\nWrong Name');
    expect(service.toCMakerTxt(action)).toBe('Wrong Name');
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe('Wrong Name');

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.text = 'GoodName';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('GoodName');
    expect(service.toCMakerTxt(action)).toBe('GoodName');
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
