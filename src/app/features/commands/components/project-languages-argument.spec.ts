import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLanguagesArgument } from './project-languages-argument';
import { ProjectLanguagesService } from '../services/project-languages-service';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { importProvidersFrom } from '@angular/core';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';

describe('ProjectLanguagesArgument', () => {
  let component: ProjectLanguagesArgument;
  let fixture: ComponentFixture<ProjectLanguagesArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectLanguagesService,
        ProjectContextService,
        { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
        importProvidersFrom(LucideAngularModule.pick({ Menu, ChevronDown })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectLanguagesArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
