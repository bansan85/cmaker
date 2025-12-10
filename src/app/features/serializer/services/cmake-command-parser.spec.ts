import { TestBed } from '@angular/core/testing';

import { CMakeCommandParser } from './cmake-command-parser';

describe('CMakeCommandParser', () => {
  let service: CMakeCommandParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMakeCommandParser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
