import { TestBed } from "@angular/core/testing";

import { CMakeMsvcRuntimeLibraryVariableService } from "./cmake-msvc-runtime-library-variable-service";

describe("CMakeMsvcRuntimeLibraryVariableService", () => {
  let service: CMakeMsvcRuntimeLibraryVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeMsvcRuntimeLibraryVariableService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
