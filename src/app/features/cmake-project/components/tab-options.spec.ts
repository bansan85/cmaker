import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptions } from './tab-options';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('TabOptions', () => {
  let component: TabOptions;
  let fixture: ComponentFixture<TabOptions>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
