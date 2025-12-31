import { TestBed } from '@angular/core/testing';

import { StringService } from './string-service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('StringService', () => {
  let service: StringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
