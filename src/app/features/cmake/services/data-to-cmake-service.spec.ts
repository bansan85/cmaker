import { TestBed } from '@angular/core/testing';

import { DataToCMakeService } from './data-to-cmake-service';

describe('DataToCMakeService', () => {
  let service: DataToCMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataToCMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
