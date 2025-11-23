import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeVariable } from './cmake-project-project-name-include-variable';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('CMakeProjectProjectNameIncludeVariable', () => {
  let component: CMakeProjectProjectNameIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectProjectNameIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectProjectNameIncludeVariable],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectProjectNameIncludeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
