import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLicenseArgument } from './project-license-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectLicenseService } from '../services/project-license-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';

describe('ProjectLicenseArgument', () => {
  let component: ProjectLicenseArgument;
  let fixture: ComponentFixture<ProjectLicenseArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectLicenseService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectLicenseArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
