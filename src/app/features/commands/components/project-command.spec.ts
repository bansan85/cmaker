import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectCommand } from "./project-command";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";

describe("ProjectCommand", () => {
  let component: ProjectCommand;
  let fixture: ComponentFixture<ProjectCommand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCommand],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCommand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
