import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import {
  StubAsyncInvalidValidator,
  StubValidTag,
  StubVersionTag,
} from '../../tests/components/stubs';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { ProjectCompatVersionArgument } from './project-compat-version-argument';

class Page {
  constructor(
    private fixture: ComponentFixture<ProjectCompatVersionArgument>
  ) {}

  get projectCompatVersionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="project-compat-version"]')
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

describe('ProjectCompatVersionArgument', () => {
  let component: ProjectCompatVersionArgument;
  let fixture: ComponentFixture<ProjectCompatVersionArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectCompatVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectCompatVersionArgument, {
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

      fixture = TestBed.createComponent(ProjectCompatVersionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectCompatVersionInput).toBeTruthy();
    });

    it('should change value in component', async () => {
      const { projectCompatVersionInput } = page;

      projectCompatVersionInput.value = '4.rez';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();

      projectCompatVersionInput.value = '4.2';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.versionString).toBe('4.2');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectCompatVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectCompatVersionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectCompatVersionInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectCompatVersionInput, versionTag, validTag } = page;

      projectCompatVersionInput.value = '4.rez';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectCompatVersionInput.value = '4.2';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBe(false);
      expect(component.versionString).toBe('4.2');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
