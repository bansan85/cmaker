import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCommand } from './project-command';

describe('ProjectCommand', () => {
  let component: ProjectCommand;
  let fixture: ComponentFixture<ProjectCommand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCommand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCommand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
