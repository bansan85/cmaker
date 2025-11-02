import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectVersionArgument } from "./project-version-argument";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectVersionService } from "../services/project-version-service";

describe("ProjectVersionArgument", () => {
  let component: ProjectVersionArgument;
  let fixture: ComponentFixture<ProjectVersionArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectVersionArgument],
      providers: [ProjectContextService, ProjectVersionService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
