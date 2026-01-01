import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChevronDown, LucideAngularModule, Menu } from 'lucide-angular';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCommand } from './project-command';

describe('ProjectCommand', () => {
  let component: ProjectCommand;
  let fixture: ComponentFixture<ProjectCommand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
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
