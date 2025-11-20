import { TestBed } from '@angular/core/testing';

import { FullProjectService } from './full-project-service';

describe('FullProjectService', () => {
  let service: FullProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
