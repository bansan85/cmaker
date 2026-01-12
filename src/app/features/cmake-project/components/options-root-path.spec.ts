import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InvokeArgs } from '@tauri-apps/api/core';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { MockIpc } from '../../../shared/classes/tests/mock-ipc';
import { Version } from '../../../shared/models/version';
import {
  StubAsyncInvalidValidator,
  StubValidTag,
} from '../../tests/components/stubs';
import { OptionsRootPathService } from '../services/options-root-path-service';
import { ProjectContextService } from '../services/project-context-service';
import { OptionsRootPath } from './options-root-path';

class Page {
  constructor(private readonly fixture: ComponentFixture<OptionsRootPath>) {}

  get rootPathButton() {
    return this.fixture.debugElement.query(
      By.css('button[name="root-path-button"]')
    ).nativeElement as HTMLButtonElement;
  }

  get rootPathInput() {
    return this.fixture.debugElement.query(By.css('input[name="root-path"]'))
      .nativeElement as HTMLInputElement;
  }

  get validTag() {
    return this.fixture.debugElement.query(By.css('app-valid-tag span'))
      .nativeElement as HTMLSpanElement;
  }
}

describe('OptionsRootPath', () => {
  let component: OptionsRootPath;
  let fixture: ComponentFixture<OptionsRootPath>;
  let page: Page;

  let mockIpcOpen: Promise<string>;
  let mockIpcPathExists: boolean;
  let mockIpc: MockIpc;

  beforeAll(() => {
    mockIpc = new MockIpc();
    mockIpc.mockCommand(
      'plugin:dialog|open',
      (_args?: InvokeArgs) => mockIpcOpen
    );
    mockIpc.mockCommand(
      'path_exists',
      (_args?: InvokeArgs) => mockIpcPathExists
    );
    mockIpc.start();
  });

  afterAll(() => {
    mockIpc.stop();
  });

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = true;

      await TestBed.configureTestingModule({
        imports: [OptionsRootPath],
        providers: [
          ProjectContextService,
          OptionsRootPathService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(OptionsRootPath, {
          set: {
            imports: [StubAsyncInvalidValidator, FormsModule, StubValidTag],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(OptionsRootPath);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should change value in component', async () => {
      expect(component).toBeTruthy();
      expect(page.rootPathButton).toBeTruthy();
      expect(page.rootPathInput).toBeTruthy();

      const { rootPathButton, rootPathInput } = page;

      mockIpcPathExists = false;
      rootPathInput.value = 'missingFolder';
      rootPathInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();

      mockIpcPathExists = true;
      rootPathInput.value = '.';
      rootPathInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.directory).toBe('.');

      mockIpcPathExists = false;
      mockIpcOpen = Promise.resolve('missingFolder');
      rootPathButton.click();
      await fixture.whenStable();

      mockIpcPathExists = true;
      mockIpcOpen = Promise.resolve('..');
      rootPathButton.click();
      await fixture.whenStable();
      expect(component.directory).toBe('..');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          OptionsRootPathService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(OptionsRootPath);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      expect(component).toBeTruthy();
      expect(page.rootPathButton).toBeTruthy();
      expect(page.rootPathInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();

      const { rootPathInput, validTag } = page;

      mockIpcPathExists = false;
      rootPathInput.value = 'missingFolder';
      rootPathInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(rootPathInput.matches('.ng-invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(true);

      mockIpcPathExists = true;
      rootPathInput.value = '.';
      rootPathInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(rootPathInput.matches('.ng-invalid')).toBe(false);
      expect(projectContextService.rootPath.directory).toBe('.');
      expect(component.directory).toBe('.');
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
