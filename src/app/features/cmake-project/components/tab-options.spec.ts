import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptions } from './tab-options';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { By } from '@angular/platform-browser';

class Page {
  constructor(private fixture: ComponentFixture<TabOptions>) {}

  get maxCMakeVersionInput() {
    return this.fixture.debugElement.query(
      By.css('input[name="max-cmake-version"]')
    );
  }

  get rootPathInput() {
    return this.fixture.debugElement.query(By.css('input[name="root-path"]'));
  }
}

describe('TabOptions', () => {
  let component: TabOptions;
  let fixture: ComponentFixture<TabOptions>;
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOptions],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabOptions);
    component = fixture.componentInstance;
    page = new Page(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change :invalid when invalid input', async () => {
    await fixture.whenStable();

    const maxCMakeVersionInput = page.maxCMakeVersionInput
      .nativeElement as HTMLInputElement;
    expect(maxCMakeVersionInput.value).toEqual('4.3');
    expect(maxCMakeVersionInput.matches(':invalid')).toBeFalse();

    maxCMakeVersionInput.value = '4.rez';
    await fixture.whenStable();
    expect(maxCMakeVersionInput.matches(':invalid')).toBeTrue();
  });
});
