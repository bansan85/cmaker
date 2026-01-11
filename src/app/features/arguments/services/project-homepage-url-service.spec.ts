import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectHomepageUrlService } from './project-homepage-url-service';

describe('ProjectHomepageUrlService', () => {
  let service: ProjectHomepageUrlService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectHomepageUrlService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectHomepageUrlService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should support missing optional fields', async () => {
    expect(service).toBeTruthy();

    const action: InputStringModel = { text: 'Hello' };
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toStrictEqual(
      new Version(3, 12)
    );
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      '# Invalid\nHOMEPAGE_URL "Hello"'
    );
    expect(service.toCMakerTxt(action)).toBe('HOMEPAGE_URL "Hello"');
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe('HOMEPAGE_URL "Hello"');

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(false);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.text = 'https://www.example.com';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      'HOMEPAGE_URL "https://www.example.com"'
    );
    expect(service.toCMakerTxt(action)).toBe(
      'HOMEPAGE_URL "https://www.example.com"'
    );
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
