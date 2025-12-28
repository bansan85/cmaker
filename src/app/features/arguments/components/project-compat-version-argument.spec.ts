import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompatVersionArgument } from './project-compat-version-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { By } from '@angular/platform-browser';
import {
  StubAsyncInvalidValidator,
  StubValidTag,
  StubVersionTag,
} from '../../tests/components/stubs';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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

    it('should change input.ng-invalid when invalid input', async () => {
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
          ChangeDetectorRef,
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
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBeTrue();
      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeTrue();

      projectCompatVersionInput.value = '4.2';
      projectCompatVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectCompatVersionInput.matches('.ng-invalid')).toBeFalse();
      expect(component.versionString).toBe('4.2');
      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeFalse();

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBeTrue();
      expect(validTag.matches('.invalid')).toBeFalse();
    });
  });
});
