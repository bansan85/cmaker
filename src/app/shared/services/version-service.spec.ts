import { TestBed } from '@angular/core/testing';

import { VersionService } from './version-service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
