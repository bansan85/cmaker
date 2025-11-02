import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVersionOption } from './project-version-option';

describe('ProjectVersionOption', () => {
  let component: ProjectVersionOption;
  let fixture: ComponentFixture<ProjectVersionOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectVersionOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectVersionOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
