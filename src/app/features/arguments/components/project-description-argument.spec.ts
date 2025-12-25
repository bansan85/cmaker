import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDescriptionArgument } from './project-description-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectDescriptionService } from '../services/project-description-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StubValidTag, StubVersionTag } from '../../tests/components/stubs';

class Page {
  constructor(private fixture: ComponentFixture<ProjectDescriptionArgument>) {}

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
          set: { imports: [FormsModule, StubValidTag, StubVersionTag] },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ProjectDescriptionArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectDescriptionInput).toBeTruthy();
    });

    it('should change input:invalid when invalid input', async () => {
      const { projectDescriptionInput } = page;

      projectDescriptionInput.value = 'Describe me';
      projectDescriptionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectDescriptionInput.matches(':invalid')).toBeFalse();
      expect(component.value).toBe('Describe me');
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

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectDescriptionInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectDescriptionInput, versionTag, validTag } = page;

      projectDescriptionInput.value = 'Describe me';
      projectDescriptionInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectDescriptionInput.matches(':invalid')).toBeFalse();
      expect(component.value).toBe('Describe me');
      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeFalse();

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBeTrue();
      expect(validTag.matches('.invalid')).toBeFalse();
    });
  });
});
