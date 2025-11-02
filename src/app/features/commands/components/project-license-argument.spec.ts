import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectLicenseArgument } from "./project-license-argument";

describe("ProjectLicenseArgument", () => {
  let component: ProjectLicenseArgument;
  let fixture: ComponentFixture<ProjectLicenseArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLicenseArgument],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectLicenseArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
