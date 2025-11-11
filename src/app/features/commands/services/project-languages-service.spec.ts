import { TestBed } from "@angular/core/testing";

import { ProjectLanguagesService } from "./project-languages-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";

describe("ProjectLanguagesService", () => {
  let service: ProjectLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectLanguagesService,
        ProjectContextService,
        { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
      ],
    });
    service = TestBed.inject(ProjectLanguagesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
