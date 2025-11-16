import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompatVersionArgument } from './project-compat-version-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCompatVersionService } from '../services/project-compat-version-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectCompatVersionArgument', () => {
  let component: ProjectCompatVersionArgument;
  let fixture: ComponentFixture<ProjectCompatVersionArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectCompatVersionService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCompatVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
