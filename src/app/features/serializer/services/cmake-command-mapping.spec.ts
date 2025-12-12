import { TestBed } from '@angular/core/testing';

import { CMakeCommandMapping } from './cmake-command-mapping';

describe('CMakeCommandMapping', () => {
  let service: CMakeCommandMapping;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeCommandMapping);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
