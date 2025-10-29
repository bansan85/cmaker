import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLicenseOption } from './project-license-option';

describe('ProjectLicenseOption', () => {
  let component: ProjectLicenseOption;
  let fixture: ComponentFixture<ProjectLicenseOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLicenseOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLicenseOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
