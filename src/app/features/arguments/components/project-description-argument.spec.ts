import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDescriptionArgument } from './project-description-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectDescriptionService } from '../services/project-description-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectDescriptionArgument', () => {
  let component: ProjectDescriptionArgument;
  let fixture: ComponentFixture<ProjectDescriptionArgument>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
