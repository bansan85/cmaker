import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TabProject } from "./tab-project";
import { ProjectContextService } from "../services/project-context-service";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";

describe("TabProject", () => {
  let component: TabProject;
  let fixture: ComponentFixture<TabProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabProject],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
