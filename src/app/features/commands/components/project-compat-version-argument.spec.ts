import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectCompatVersionArgument } from "./project-compat-version-argument";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { ProjectCompatVersionService } from "../services/project-compat-version-service";

describe("ProjectCompatVersionArgument", () => {
  let component: ProjectCompatVersionArgument;
  let fixture: ComponentFixture<ProjectCompatVersionArgument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCompatVersionArgument],
      providers: [ProjectContextService, ProjectCompatVersionService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCompatVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
