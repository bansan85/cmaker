import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectCompatVersionService } from "./project-compat-version-service";
import { ProjectCompatVersionArgument } from "../components/project-compat-version-argument";

describe("ProjectCompatVersionService", () => {
  let service: ProjectCompatVersionService;
  let fixture: ComponentFixture<ProjectCompatVersionArgument>;
  let component: ProjectCompatVersionArgument;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCompatVersionService],
    });
    service = TestBed.inject(ProjectCompatVersionService);
    fixture = TestBed.createComponent(ProjectCompatVersionArgument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
