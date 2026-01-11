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
import { ProjectVersionService } from '../services/project-version-service';
import { ProjectVersionArgument } from './project-version-argument';

class Page {
  constructor(
    private readonly fixture: ComponentFixture<ProjectVersionArgument>
  ) {}

  get projectVersionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="project-version"]')
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

describe('ProjectVersionArgument', () => {
  let component: ProjectVersionArgument;
  let fixture: ComponentFixture<ProjectVersionArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectVersionArgument, {
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

      fixture = TestBed.createComponent(ProjectVersionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should change value in component', async () => {
      expect(component).toBeTruthy();
      expect(page.projectVersionInput).toBeTruthy();

      const { projectVersionInput } = page;

      projectVersionInput.value = '1.2.3';
      projectVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.version).toStrictEqual(new Version('1.2.3'));
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectVersionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectVersionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      expect(component).toBeTruthy();
      expect(page.projectVersionInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();

      const { projectVersionInput, versionTag, validTag } = page;

      projectVersionInput.value = '3..2';
      projectVersionInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      expect(projectVersionInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectVersionInput.value = '3.1.2';
      projectVersionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectVersionInput.matches('.ng-invalid')).toBe(false);
      expect(component.version).toStrictEqual(new Version('3.1.2'));
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
