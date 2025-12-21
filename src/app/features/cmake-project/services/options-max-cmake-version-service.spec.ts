import { TestBed } from '@angular/core/testing';

import { OptionsMaxCMakeVersionService } from './options-max-cmake-version-service';

describe('OptionsMaxCMakeVersionService', () => {
  let service: OptionsMaxCMakeVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsMaxCMakeVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
