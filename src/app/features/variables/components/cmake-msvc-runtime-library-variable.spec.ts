import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CMakeMsvcRuntimeLibraryVariable } from "./cmake-msvc-runtime-library-variable";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";

describe("CMakeMsvcRuntimeLibraryVariable", () => {
  let component: CMakeMsvcRuntimeLibraryVariable;
  let fixture: ComponentFixture<CMakeMsvcRuntimeLibraryVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeMsvcRuntimeLibraryVariable],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeMsvcRuntimeLibraryVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
