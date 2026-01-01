import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { RustBackendService } from './rust-backend-service';

describe('RustBackendService', () => {
  let service: RustBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RustBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
