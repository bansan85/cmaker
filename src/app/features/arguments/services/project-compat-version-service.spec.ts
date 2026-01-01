import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { ProjectCompatVersionService } from './project-compat-version-service';

describe('ProjectCompatVersionService', () => {
  let service: ProjectCompatVersionService;
  //let fixture: ComponentFixture<ProjectCompatVersionArgument>;
  //let component: ProjectCompatVersionArgument;

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
    //fixture = TestBed.createComponent(ProjectCompatVersionArgument);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
