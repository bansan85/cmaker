import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockIPC } from '@tauri-apps/api/mocks';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import {
  StubOptionsMaxCMakeVersion,
  StubOptionsRootPath,
} from '../../tests/components/stubs';
import { ProjectContextService } from '../services/project-context-service';
import { TabOptions } from './tab-options';

class Page {
  constructor(private fixture: ComponentFixture<TabOptions>) {}

  get maxCMakeVersion() {
    return this.fixture.debugElement.query(
      By.css('app-options-max-cmake-version')
    ).nativeElement as HTMLElement;
  }

  get rootPath() {
    return this.fixture.debugElement.query(By.css('app-options-root-path'))
      .nativeElement as HTMLElement;
  }
}

describe('TabOptions', () => {
  let component: TabOptions;
  let fixture: ComponentFixture<TabOptions>;
  let page: Page;

  let mockIpcOpen: Promise<string>;
  let mockIpcPathExists: boolean;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = true;

      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(TabOptions, {
          set: { imports: [StubOptionsMaxCMakeVersion, StubOptionsRootPath] },
        })
        .compileComponents();

      mockIPC((cmd, args) => {
        if (cmd === 'plugin:dialog|open') {
          return mockIpcOpen;
        }
        if (cmd === 'path_exists') {
          return mockIpcPathExists;
        }
        throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
      });

      fixture = TestBed.createComponent(TabOptions);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.maxCMakeVersion).toBeTruthy();
      expect(page.rootPath).toBeTruthy();
    });
  });

  describe('Full Component Testing', () => {
    beforeEach(async () => {
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = true;

      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      mockIPC((cmd, args) => {
        if (cmd === 'plugin:dialog|open') {
          return mockIpcOpen;
        }
        if (cmd === 'path_exists') {
          return mockIpcPathExists;
        }
        throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
      });

      fixture = TestBed.createComponent(TabOptions);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.maxCMakeVersion).toBeTruthy();
      expect(page.rootPath).toBeTruthy();
    });
  });
});
