import { TestBed } from '@angular/core/testing';

import { ResourceService } from './resource-service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ResourceService', () => {
  let service: ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
