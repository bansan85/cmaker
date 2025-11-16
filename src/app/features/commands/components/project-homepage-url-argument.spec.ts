import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHomepageUrlArgument } from './project-homepage-url-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectHomepageUrlService } from '../services/project-homepage-url-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectHomepageUrlArgument', () => {
  let component: ProjectHomepageUrlArgument;
  let fixture: ComponentFixture<ProjectHomepageUrlArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectHomepageUrlService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHomepageUrlArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
