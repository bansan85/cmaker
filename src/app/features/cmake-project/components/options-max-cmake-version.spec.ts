import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import {
  StubAsyncInvalidValidator,
  StubValidTag,
} from '../../tests/components/stubs';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';
import { ProjectContextService } from '../services/project-context-service';
import { OptionsMaxCMakeVersion } from './options-max-cmake-version';

class Page {
  constructor(private fixture: ComponentFixture<OptionsMaxCMakeVersion>) {}

  get maxCMakeVersionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="max-cmake-version"]')
    ).nativeElement as HTMLInputElement;
  }

  get validTag() {
    return this.fixture.debugElement.query(By.css('app-valid-tag span'))
      .nativeElement as HTMLSpanElement;
  }
}

describe('OptionsMaxCMakeVersion', () => {
  let component: OptionsMaxCMakeVersion;
  let fixture: ComponentFixture<OptionsMaxCMakeVersion>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          OptionsMaxCMakeVersionService,
          ProjectContextService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(OptionsMaxCMakeVersion, {
          set: {
            imports: [FormsModule, StubValidTag, StubAsyncInvalidValidator],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(OptionsMaxCMakeVersion);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.maxCMakeVersionInput).toBeTruthy();
    });

    it('should change value in component', async () => {
      const { maxCMakeVersionInput } = page;

      maxCMakeVersionInput.value = '4.rez';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();

      maxCMakeVersionInput.value = '4.4';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.versionString).toBe('4.4');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          OptionsMaxCMakeVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(OptionsMaxCMakeVersion);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.maxCMakeVersionInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { maxCMakeVersionInput, validTag } = page;

      maxCMakeVersionInput.value = '4.rez';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(maxCMakeVersionInput.matches('.ng-invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(true);

      maxCMakeVersionInput.value = '4.2';
      maxCMakeVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(maxCMakeVersionInput.matches('.ng-invalid')).toBe(false);
      expect(component.versionString).toBe('4.2');
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
