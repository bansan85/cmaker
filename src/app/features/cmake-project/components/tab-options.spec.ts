import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptions } from './tab-options';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { By } from '@angular/platform-browser';
import { mockIPC } from '@tauri-apps/api/mocks';
import {
  StubOptionsMaxCMakeVersion,
  StubOptionsRootPath,
} from '../../tests/components/stubs';
import { FormsModule } from '@angular/forms';

class Page {
  constructor(private fixture: ComponentFixture<TabOptions>) {}

  get maxCMakeVersionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="max-cmake-version"]')
    ).nativeElement as HTMLInputElement;
  }

  get rootPathButton() {
    return this.fixture.debugElement.query(
      By.css('button[name="root-path-button"]')
    ).nativeElement as HTMLButtonElement;
  }

  get rootPathInput() {
    return this.fixture.debugElement.query(By.css('input[name="root-path"]'))
      .nativeElement as HTMLInputElement;
  }
}

describe('TabOptions', () => {
  let component: TabOptions;
  let fixture: ComponentFixture<TabOptions>;

  let mockIpcOpen: Promise<string>;
  let mockIpcPathExists: boolean;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = true;

      await TestBed.configureTestingModule({
        imports: [TabOptions],
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
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Full Component Testing', () => {
    let page: Page;
    let service: ProjectContextService;

    beforeEach(async () => {
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = true;

      await TestBed.configureTestingModule({
        imports: [TabOptions, FormsModule],
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

      service = TestBed.inject(ProjectContextService);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should change :invalid when invalid input', async () => {
      const { maxCMakeVersionInput } = page;
      expect(maxCMakeVersionInput.value).toEqual('4.3');
      expect(maxCMakeVersionInput.matches(':invalid')).toBeFalse();
      expect(component.maxCMakeVersionSignal().versionString).toBe('4.3');

      maxCMakeVersionInput.value = '4.rez';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(maxCMakeVersionInput.matches(':invalid')).toBeTrue();

      maxCMakeVersionInput.value = '4.2';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(maxCMakeVersionInput.value).toEqual('4.2');
      expect(maxCMakeVersionInput.matches(':invalid')).toBeFalse();
      expect(component.maxCMakeVersionSignal().versionString).toBe('4.2');
    });

    it('should update root path input', async () => {
      const { rootPathInput } = page;
      rootPathInput.value = 'c:/temp';
      rootPathInput.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(component.rootPathSignal().value).toEqual('c:/temp');
      expect(service.rootPath.value).toEqual('c:/temp');

      rootPathInput.value = '4.rez';
      rootPathInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.rootPathSignal().value).toEqual('4.rez');
      expect(service.rootPath.value).toEqual('4.rez');
    });

    it('should update root path button', async () => {
      const { rootPathButton } = page;
      const { rootPathInput } = page;
      mockIpcOpen = Promise.resolve('c:/temp2');
      mockIpcPathExists = false;
      rootPathButton.click();
      await fixture.whenStable();
      await fixture.whenStable();
      expect(component.rootPathSignal().value).toEqual('c:/temp2');
      expect(service.rootPath.value).toEqual('c:/temp2');
      expect(rootPathInput.matches('.ng-invalid')).toBeTrue();

      mockIpcOpen = Promise.resolve('.');
      mockIpcPathExists = true;
      rootPathButton.click();
      await fixture.whenStable();
      await fixture.whenStable();
      expect(component.rootPathSignal().value).toEqual('.');
      expect(service.rootPath.value).toEqual('.');
      expect(rootPathInput.matches('.ng-valid')).toBeTrue();
    });
  });
});
