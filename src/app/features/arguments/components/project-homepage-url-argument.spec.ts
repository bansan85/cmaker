import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHomepageUrlArgument } from './project-homepage-url-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StubValidTag, StubVersionTag } from '../../tests/components/stubs';

class Page {
  constructor(private fixture: ComponentFixture<ProjectHomepageUrlArgument>) {}

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
          set: { imports: [FormsModule, StubValidTag, StubVersionTag] },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ProjectHomepageUrlArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectHomepageUrlInput).toBeTruthy();
    });

    it('should change input:invalid when invalid input', async () => {
      const { projectHomepageUrlInput } = page;

      projectHomepageUrlInput.value = 'example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches(':invalid')).toBeTrue();

      projectHomepageUrlInput.value = 'http://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches(':invalid')).toBeFalse();
      expect(component.value).toBe('http://example.com');

      projectHomepageUrlInput.value = 'https://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches(':invalid')).toBeFalse();
      expect(component.value).toBe('https://example.com');
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

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectHomepageUrlInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectHomepageUrlInput, versionTag, validTag } = page;

      projectHomepageUrlInput.value = 'example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches(':invalid')).toBeTrue();
      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeTrue();

      projectHomepageUrlInput.value = 'https://example.com';
      projectHomepageUrlInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectHomepageUrlInput.matches(':invalid')).toBeFalse();
      expect(component.value).toBe('https://example.com');
      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeFalse();

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBeTrue();
      expect(validTag.matches('.invalid')).toBeFalse();
    });
  });
});
