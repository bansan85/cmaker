import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLanguagesArgument } from './project-languages-argument';
import { ProjectLanguagesService } from '../services/project-languages-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { importProvidersFrom } from '@angular/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import {
  StubCheckboxesItem,
  StubCheckboxesList,
  StubValidTag,
  StubVersionTag,
} from '../../tests/components/stubs';
import { By } from '@angular/platform-browser';

class Page {
  constructor(private fixture: ComponentFixture<ProjectLanguagesArgument>) {}

  get projectLanguagesOutput() {
    return this.fixture.debugElement.query(By.css('span[data-testid="value"]'))
      .nativeElement as HTMLInputElement;
  }

  get multiSelectBox() {
    return this.fixture.debugElement.query(
      By.css('app-checkboxes-list .selectBox')
    ).nativeElement as HTMLDivElement;
  }

  get checkboxes() {
    return this.fixture.debugElement.query(
      By.css('app-checkboxes-list div[id|="checkboxes-list"]')
    ).nativeElement as HTMLDivElement;
  }

  checkboxLanguage(language: string) {
    return this.fixture.debugElement.query(
      By.css(
        `app-checkboxes-list input[id|="name-${language}-project-languages"]`
      )
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

describe('ProjectLanguagesArgument', () => {
  let component: ProjectLanguagesArgument;
  let fixture: ComponentFixture<ProjectLanguagesArgument>;
  let page: Page;

  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectLanguagesService,
          ProjectContextService,
          { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
          importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
        ],
      })
        .overrideComponent(ProjectLanguagesArgument, {
          set: {
            imports: [
              StubCheckboxesList,
              StubCheckboxesItem,
              StubValidTag,
              StubVersionTag,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(ProjectLanguagesArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectLanguagesOutput).toBeTruthy();
    });

    it('should change input:invalid when invalid input', () => {
      const { projectLanguagesOutput } = page;

      expect(projectLanguagesOutput.textContent).toBe('NONE');
    });
  });

  describe('Full Component Testing', () => {
    let projectContextService: ProjectContextService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          ProjectLanguagesService,
          ProjectContextService,
          { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
          importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProjectLanguagesArgument);
      component = fixture.componentInstance;
      page = new Page(fixture);
      projectContextService = TestBed.inject(ProjectContextService);

      await fixture.whenStable();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(page.projectLanguagesOutput).toBeTruthy();
      expect(page.multiSelectBox).toBeTruthy();
      expect(page.checkboxes).toBeTruthy();
      expect(page.checkboxLanguage('CXX')).toBeTruthy();
      expect(page.validTag).toBeTruthy();
      expect(page.versionTag).toBeTruthy();
    });

    it('should set .invalid for version / valid tags when invalid input / version', async () => {
      const {
        projectLanguagesOutput,
        multiSelectBox,
        checkboxes,
        versionTag,
        validTag,
      } = page;

      expect(checkboxes.matches('.checkboxesShow')).toBeFalse();

      multiSelectBox.click();

      await fixture.whenStable();

      expect(checkboxes.matches('.checkboxesShow')).toBeTrue();

      page.checkboxLanguage('C').click();
      page.checkboxLanguage('CXX').click();
      page.checkboxLanguage('CSharp').click();

      await fixture.whenStable();

      expect(projectLanguagesOutput.textContent).toEqual('C CXX CSharp');

      expect(versionTag.matches('.invalid')).toBeFalse();
      expect(validTag.matches('.invalid')).toBeFalse();

      projectContextService.maxCMakeVersion = new Version('3.0');
      await fixture.whenStable();
      expect(versionTag.matches('.invalid')).toBeTrue();
      expect(validTag.matches('.invalid')).toBeFalse();
    });
  });
});
