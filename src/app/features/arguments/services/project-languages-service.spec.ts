import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputLanguagesModel } from '../../../shared/models/arguments/input-languages-model';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectLanguagesService } from './project-languages-service';

describe('ProjectLanguagesService', () => {
  let service: ProjectLanguagesService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectLanguagesService,
        ProjectContextService,
        { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
      ],
    });
    service = TestBed.inject(ProjectLanguagesService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support missing optional fields', async () => {
    const action: InputLanguagesModel = { languages: '' };
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      '# Invalid\nLANGUAGES \n'
    );
    expect(service.toCMakerTxt(action)).toBe(`LANGUAGES \n`);
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe(`LANGUAGES \n`);

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.languages = 'C CXX';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('LANGUAGES C CXX\n');
    expect(service.toCMakerTxt(action)).toBe(`LANGUAGES C CXX\n`);
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.languages = 'C CXX HELLO';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      '# Invalid\nLANGUAGES C CXX HELLO\n'
    );
    expect(service.toCMakerTxt(action)).toBe(`LANGUAGES C CXX HELLO\n`);
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });

  it('should improve coverage code', () => {
    const action: InputLanguagesModel = { languages: 'ASM_MARMASM' };
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
    action.languages = 'HIP';
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
    action.languages = 'ISPC';
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
    action.languages = 'OBJCXX';
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
    action.languages = 'Swift';
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
    action.languages = 'CUDA';
    expect(service.cmakeRequiredVersion(action)).toBeTruthy();
  });
});
