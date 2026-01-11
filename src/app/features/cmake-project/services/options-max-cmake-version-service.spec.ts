import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputVersionModel } from '../../../shared/models/arguments/input-version-model';
import { Version } from '../../../shared/models/version';
import { OptionsMaxCMakeVersionService } from './options-max-cmake-version-service';
import { ProjectContextService } from './project-context-service';

describe('OptionsMaxCMakeVersionService', () => {
  let service: OptionsMaxCMakeVersionService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        OptionsMaxCMakeVersionService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(OptionsMaxCMakeVersionService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should support missing optional fields', async () => {
    expect(service).toBeTruthy();

    const action: InputVersionModel = {};
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.cmakeObjects(action)).toBeTruthy();
    await expect(service.toCMakeListTxt(action)).rejects.toThrow(
      'cmaker_max_cmake_version is not serializable to CMakeLists.txt'
    );
    expect(service.toCMakerTxt(action)).toBe(
      'cmaker_max_cmake_version(undefined)'
    );
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe(
      'cmaker_max_cmake_version(undefined)'
    );

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.version = new Version(1, 2, 3, 4);
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    await expect(service.toCMakeListTxt(action)).rejects.toThrow(
      'cmaker_max_cmake_version is not serializable to CMakeLists.txt'
    );
    expect(service.toCMakerTxt(action)).toBe(
      'cmaker_max_cmake_version(1.2.3.4)'
    );
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
