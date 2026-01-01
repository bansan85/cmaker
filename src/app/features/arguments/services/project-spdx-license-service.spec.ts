import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputLicenseModel } from '../../../shared/models/arguments/input-license-model';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectSpdxLicenseService } from './project-spdx-license-service';

describe('ProjectLicenseService', () => {
  let service: ProjectSpdxLicenseService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectSpdxLicenseService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectSpdxLicenseService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support missing optional fields', async () => {
    const action: InputLicenseModel = { license: 'WRONG LICENSE' };
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toStrictEqual(
      new Version(4, 2)
    );
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      '# Invalid\nSPDX_LICENSE "WRONG LICENSE"\n'
    );
    expect(service.toCMakerTxt(action)).toBe(`SPDX_LICENSE "WRONG LICENSE"\n`);
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe(`SPDX_LICENSE "WRONG LICENSE"\n`);

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(false);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.license = 'MIT';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('SPDX_LICENSE "MIT"\n');
    expect(service.toCMakerTxt(action)).toBe(`SPDX_LICENSE "MIT"\n`);
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
