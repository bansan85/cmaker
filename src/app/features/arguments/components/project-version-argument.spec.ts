import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVersionArgument } from './project-version-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectVersionService } from '../services/project-version-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectVersionArgument', () => {
  let component: ProjectVersionArgument;
  let fixture: ComponentFixture<ProjectVersionArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectVersionService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
