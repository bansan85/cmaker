import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CMakeProjectIncludeBeforeVariable } from './cmake-project-include-before-variable';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('CMakeProjectIncludeBeforeVariable', () => {
  let component: CMakeProjectIncludeBeforeVariable;
  let fixture: ComponentFixture<CMakeProjectIncludeBeforeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectIncludeBeforeVariable],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectIncludeBeforeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
