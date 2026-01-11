import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import {
  StubAsyncInvalidValidator,
  StubValidTag,
  StubVersionTag,
} from '../../tests/components/stubs';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { ProjectHomepageUrlArgument } from './project-homepage-url-argument';

class Page {
  constructor(
    private readonly fixture: ComponentFixture<ProjectHomepageUrlArgument>
  ) {}

  get projectHomepageUrlInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="project-homepage-url"]')
    ).nativeElement as HTMLInputElement;
  }

  get versionTag() {
    return this.fixture.debugElement.query(By.css('app-version-tag span'))
      .nativeElement as HTMLSpanElement;
  }

  get validTag() {
    return this.fixture.debugElement.query(By.css('app-valid-tag span'))
      .nativeElement as HTMLSpanElement;
  }
}

describe('ProjectHomepageUrlArgument', () => {
  let component: ProjectHomepageUrlArgument;
  let fixture: ComponentFixture<ProjectHomepageUrlArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectHomepageUrlService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectHomepageUrlArgument, {
          set: {
            imports: [
              FormsModule,
              StubValidTag,
              StubVersionTag,
              StubAsyncInvalidValidator,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ProjectHomepageUrlArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should change value in component', async () => {
      expect(component).toBeTruthy();
      expect(page.projectHomepageUrlInput).toBeTruthy();

      const { projectHomepageUrlInput } = page;

      projectHomepageUrlInput.value = 'example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();

      projectHomepageUrlInput.value = 'http://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.text).toBe('http://example.com');

      projectHomepageUrlInput.value = 'https://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.text).toBe('https://example.com');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectHomepageUrlService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectHomepageUrlArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      expect(component).toBeTruthy();
      expect(page.projectHomepageUrlInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();

      const { projectHomepageUrlInput, versionTag, validTag } = page;

      projectHomepageUrlInput.value = 'example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectHomepageUrlInput.value = 'https://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches('.ng-invalid')).toBe(false);
      expect(component.text).toBe('https://example.com');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
