import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMsvcRuntime } from './project-msvc-runtime';

describe('ProjectMsvcRuntime', () => {
  let component: ProjectMsvcRuntime;
  let fixture: ComponentFixture<ProjectMsvcRuntime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMsvcRuntime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMsvcRuntime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
