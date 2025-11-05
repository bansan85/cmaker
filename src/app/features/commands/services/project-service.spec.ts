import { TestBed } from "@angular/core/testing";

import { ProjectService } from "./project-service";
import { ProjectLicenseService } from "./project-license-service";
import { ProjectContextService } from "../../cmake-project/services/project-context-service";
import { Version } from "../../../shared/models/version";
import { DEFAULT_MAX_VERSION } from "../../../app.tokens";
import { ProjectVersionService } from "./project-version-service";
import { ProjectCompatVersionService } from "./project-compat-version-service";
import { ProjectDescriptionService } from "./project-description-service";
import { ProjectHomepageUrlService } from "./project-homepage-url-service";

describe("ProjectService", () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        ProjectLicenseService,
        ProjectContextService,
        ProjectVersionService,
        ProjectCompatVersionService,
        ProjectDescriptionService,
        ProjectHomepageUrlService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(ProjectService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
