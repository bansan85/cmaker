import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectVersionArgument } from "./project-version-argument";

describe("ProjectVersionArgument", () => {
  let component: ProjectVersionArgument;
  let fixture: ComponentFixture<ProjectVersionArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectVersionArgument],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
