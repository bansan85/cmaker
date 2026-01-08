import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { InputStringModel } from '../../../shared/models/arguments/input-string-model';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectDescriptionService } from './project-description-service';

describe('ProjectDescriptionService', () => {
  let service: ProjectDescriptionService;
  let projectContext: ProjectContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectDescriptionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectDescriptionService);
    projectContext = TestBed.inject(ProjectContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should support missing optional fields', async () => {
    const action: InputStringModel = { text: '' };
    projectContext.maxCMakeVersion = undefined;

    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeRequiredVersion(action)).toStrictEqual(
      new Version(3, 9)
    );
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe('DESCRIPTION ""');
    expect(service.toCMakerTxt(action)).toBe('DESCRIPTION ""');
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe('DESCRIPTION ""');

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.maxCMakeVersion = new Version(3, 0);
    expect(service.isEnabled(action)).toBe(false);

    projectContext.maxCMakeVersion = new Version(4, 3);
    expect(service.isEnabled(action)).toBe(true);

    action.text = 'Hello world';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    expect(await service.toCMakeListTxt(action)).toBe(
      'DESCRIPTION "Hello world"'
    );
    expect(service.toCMakerTxt(action)).toBe('DESCRIPTION "Hello world"');
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
