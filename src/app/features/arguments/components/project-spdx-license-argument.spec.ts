import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import {
  StubAsyncInvalidValidator,
  StubInputSpdxLicenseDataList,
  StubValidTag,
  StubVersionTag,
} from '../../tests/components/stubs';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';
import { ProjectSpdxLicenseArgument } from './project-spdx-license-argument';

class Page {
  constructor(private fixture: ComponentFixture<ProjectSpdxLicenseArgument>) {}

  get projectSpdxLicenseInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="project-spdx-license"]')
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

describe('ProjectLicenseArgument', () => {
  let component: ProjectSpdxLicenseArgument;
  let fixture: ComponentFixture<ProjectSpdxLicenseArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectSpdxLicenseService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      })
        .overrideComponent(ProjectSpdxLicenseArgument, {
          set: {
            imports: [
              FormsModule,
              StubValidTag,
              StubVersionTag,
              StubAsyncInvalidValidator,
              StubInputSpdxLicenseDataList,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ProjectSpdxLicenseArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectSpdxLicenseInput).toBeTruthy();
    });

    it('should change value in component', async () => {
      const { projectSpdxLicenseInput } = page;

      projectSpdxLicenseInput.value = 'validName';
      projectSpdxLicenseInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(component.license).toBe('validName');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectContextService,
          ProjectSpdxLicenseService,
          {
            provide: DEFAULT_MAX_VERSION,
            useValue: new Version(4, 3),
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectSpdxLicenseArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectSpdxLicenseInput).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const { projectSpdxLicenseInput, versionTag, validTag } = page;

      projectSpdxLicenseInput.value = 'Invalid SpdxLicense';
      projectSpdxLicenseInput.dispatchEvent(new Event('input'));

      await fixture.whenStable();

      expect(projectSpdxLicenseInput.matches('.ng-invalid')).toBe(true);
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(true);

      projectSpdxLicenseInput.value = 'validSpdxLicense';
      projectSpdxLicenseInput.dispatchEvent(new Event('input'));
      await fixture.whenStable();
      expect(projectSpdxLicenseInput.matches('.ng-invalid')).toBe(false);
      expect(component.license).toBe('validSpdxLicense');
      expect(versionTag.matches('.invalid')).toBe(false);
      expect(validTag.matches('.invalid')).toBe(false);

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBe(true);
      expect(validTag.matches('.invalid')).toBe(false);
    });
  });
});
