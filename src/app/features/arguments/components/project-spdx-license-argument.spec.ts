import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpdxLicenseArgument } from './project-spdx-license-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectSpdxLicenseService } from '../services/project-spdx-license-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';

describe('ProjectLicenseArgument', () => {
  let component: ProjectSpdxLicenseArgument;
  let fixture: ComponentFixture<ProjectSpdxLicenseArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectSpdxLicenseService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSpdxLicenseArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
