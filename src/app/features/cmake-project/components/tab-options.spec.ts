import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptions } from './tab-options';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { RouterTestingHarness } from '@angular/router/testing';

class Page {
  constructor(private fixture: ComponentFixture<TabOptions>) {}

  get maxCMakeVersionInput() {
    return this.fixture.debugElement.queryAll;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
