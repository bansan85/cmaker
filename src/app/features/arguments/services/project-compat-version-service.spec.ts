import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompatVersionService } from './project-compat-version-service';
import { ProjectCompatVersionArgument } from '../components/project-compat-version-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('ProjectCompatVersionService', () => {
  let service: ProjectCompatVersionService;
  let fixture: ComponentFixture<ProjectCompatVersionArgument>;
  let component: ProjectCompatVersionArgument;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectCompatVersionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectCompatVersionService);
    fixture = TestBed.createComponent(ProjectCompatVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
