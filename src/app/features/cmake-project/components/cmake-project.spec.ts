import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CMakeProject } from "./cmake-project";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";

describe("CMakeProject", () => {
  let component: CMakeProject;
  let fixture: ComponentFixture<CMakeProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProject],
      providers: [
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
