import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectCompatVersionService } from '../../arguments/services/project-compat-version-service';
import { ProjectDescriptionService } from '../../arguments/services/project-description-service';
import { ProjectHomepageUrlService } from '../../arguments/services/project-homepage-url-service';
import { ProjectLanguagesService } from '../../arguments/services/project-languages-service';
import { ProjectNameService } from '../../arguments/services/project-name-service';
import { ProjectSpdxLicenseService } from '../../arguments/services/project-spdx-license-service';
import { ProjectVersionService } from '../../arguments/services/project-version-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectService } from '../services/project-service';
import { ProjectCommand } from './project-command';

describe('ProjectCommand', () => {
  let component: ProjectCommand;
  let fixture: ComponentFixture<ProjectCommand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        ProjectService,
        ProjectSpdxLicenseService,
        ProjectVersionService,
        ProjectCompatVersionService,
        ProjectDescriptionService,
        ProjectHomepageUrlService,
        ProjectLanguagesService,
        ProjectNameService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
        importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCommand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
