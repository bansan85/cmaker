import { TestBed } from '@angular/core/testing';
import { InvokeArgs } from '@tauri-apps/api/core';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { MockIpc } from '../../../shared/classes/tests/mock-ipc';
import { InputDirectoryModel } from '../../../shared/models/arguments/input-directory-model';
import { Version } from '../../../shared/models/version';
import { OptionsRootPathService } from './options-root-path-service';
import { ProjectContextService } from './project-context-service';

describe('OptionsRootPathService', () => {
  let service: OptionsRootPathService;
  let projectContext: ProjectContextService;

  let mockIpcPathExists: boolean;
  let mockIpc: MockIpc;

  beforeAll(() => {
    mockIpc = new MockIpc();
    mockIpc.mockCommand(
      'path_exists',
      (_args?: InvokeArgs) => mockIpcPathExists
    );
    mockIpc.start();
  });

  afterAll(() => {
    mockIpc.stop();
  });

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
    projectContext = TestBed.inject(ProjectContextService);

    mockIpcPathExists = true;
  });

  it('should support missing optional fields', async () => {
    expect(service).toBeTruthy();

    const action: InputDirectoryModel = { directory: 'Hello' };
    projectContext.maxCMakeVersion = undefined;

    mockIpcPathExists = false;
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(false);
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.cmakeObjects(action)).toBeTruthy();
    await expect(service.toCMakeListTxt(action)).rejects.toThrow(
      'cmaker_root_path is not serializable to CMakeLists.txt'
    );
    expect(service.toCMakerTxt(action)).toBe('cmaker_root_path("Hello")');
    expect(service.isEffectiveVersionValid(action)).toBe(true);

    mockIpcPathExists = true;
    action.enabled = false;
    expect(service.cmakeRequiredVersion(action)).toBeNull();
    expect(service.isEnabled(action)).toBe(false);
    expect(service.cmakeObjects(action)).toBeNull();
    expect(await service.toCMakeListTxt(action)).toBe('');
    expect(service.toCMakerTxt(action)).toBe('cmaker_root_path("Hello")');

    action.enabled = true;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.rootPath = 'invalid';
    mockIpcPathExists = false;
    expect(service.isEnabled(action)).toBe(true);

    projectContext.rootPath = 'valid';
    mockIpcPathExists = true;
    expect(service.isEnabled(action)).toBe(true);

    action.directory = 'c:/temp';
    expect(service.isEnabled(action)).toBe(true);
    expect(await service.isValid(action)).toBe(true);
    expect(service.cmakeObjects(action)).toBeTruthy();
    await expect(service.toCMakeListTxt(action)).rejects.toThrow(
      'cmaker_root_path is not serializable to CMakeLists.txt'
    );
    expect(service.toCMakerTxt(action)).toBe('cmaker_root_path("c:/temp")');
    expect(service.isEffectiveVersionValid(action)).toBe(true);
  });
});
