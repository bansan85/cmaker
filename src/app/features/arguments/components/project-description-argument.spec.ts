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
import { ProjectDescriptionService } from '../services/project-description-service';
import { ProjectDescriptionArgument } from './project-description-argument';

class Page {
  constructor(
    private readonly fixture: ComponentFixture<ProjectDescriptionArgument>
  ) {}

  get projectDescriptionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="project-description"]')
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

describe('ProjectDescriptionArgument', () => {
  let component: ProjectDescriptionArgument;
  let fixture: ComponentFixture<ProjectDescriptionArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectDescriptionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectDescriptionArgument, {
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

      fixture = TestBed.createComponent(ProjectDescriptionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should change value in component', async () => {
      expect(component).toBeTruthy();
      expect(page.projectDescriptionInput).toBeTruthy();

      const { projectDescriptionInput } = page;

      projectDescriptionInput.value = 'Describe me';
      projectDescriptionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.text).toBe('Describe me');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectDescriptionService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectDescriptionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      expect(component).toBeTruthy();
      expect(page.projectDescriptionInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();

      const { projectDescriptionInput, versionTag, validTag } = page;

      projectDescriptionInput.value = 'Describe me';
      projectDescriptionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectDescriptionInput.matches('.ng-invalid')).toBe(false);
      expect(component.text).toBe('Describe me');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
