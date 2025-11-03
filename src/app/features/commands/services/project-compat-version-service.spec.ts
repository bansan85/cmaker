import { TestBed } from "@angular/core/testing";

import { ProjectCompatVersionService } from "./project-compat-version-service";

describe("ProjectCompatVersionService", () => {
  let service: ProjectCompatVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCompatVersionService],
    });
    service = TestBed.inject(ProjectCompatVersionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
