import { TestBed } from '@angular/core/testing';

import { DeserializerRegistry } from './deserializer-registry';

describe('DeserializerRegistry', () => {
  let service: DeserializerRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeserializerRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
