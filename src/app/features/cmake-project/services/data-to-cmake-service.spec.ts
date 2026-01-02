import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DataToCMakeService } from './data-to-cmake-service';

describe('DataToCMakeService', () => {
  let service: DataToCMakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataToCMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    expect(service.booleanToString(true)).toEqual('ON');
    expect(service.booleanToString(false)).toEqual('OFF');
  });
});
