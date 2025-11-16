import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNameArgument } from './project-name-argument';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { Version } from '../../../shared/models/version';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';

describe('ProjectNameArgument', () => {
  let component: ProjectNameArgument;
  let fixture: ComponentFixture<ProjectNameArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectNameArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
