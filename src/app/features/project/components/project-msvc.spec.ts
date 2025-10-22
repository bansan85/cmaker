import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMsvc } from './project-msvc';

describe('ProjectMsvc', () => {
  let component: ProjectMsvc;
  let fixture: ComponentFixture<ProjectMsvc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMsvc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMsvc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
