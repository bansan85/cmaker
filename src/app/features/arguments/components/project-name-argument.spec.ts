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
import { ProjectNameService } from '../services/project-name-service';
import { ProjectNameArgument } from './project-name-argument';

class Page {
  constructor(private fixture: ComponentFixture<ProjectNameArgument>) {}

  get projectNameInput() {
    return this.fixture.debugElement.query(By.css('input[name="project-name"]'))
      .nativeElement as HTMLInputElement;
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

describe('ProjectNameArgument', () => {
  let component: ProjectNameArgument;
  let fixture: ComponentFixture<ProjectNameArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectNameArgument, {
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

      fixture = TestBed.createComponent(ProjectNameArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectNameInput).toBeTruthy();
    });

    it('should change value in component', async () => {
      const { projectNameInput } = page;

      projectNameInput.value = 'validName';
      projectNameInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.text).toBe('validName');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectNameService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectNameArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectNameInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectNameInput, versionTag, validTag } = page;

      projectNameInput.value = 'Invalid name';
      projectNameInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      expect(projectNameInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectNameInput.value = 'validName';
      projectNameInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectNameInput.matches('.ng-invalid')).toBe(false);
      expect(component.text).toBe('validName');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
