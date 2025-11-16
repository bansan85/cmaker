import { TestBed } from "@angular/core/testing";

import { ProjectLicenseService } from "./project-license-service";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";
import { Version } from "../../../shared/models/version";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";

describe("ProjectLicenseService", () => {
  let service: ProjectLicenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectLicenseService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectLicenseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
