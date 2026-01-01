import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { ResourceService } from './resource-service';

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
