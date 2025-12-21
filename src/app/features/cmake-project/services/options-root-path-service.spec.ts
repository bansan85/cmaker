import { TestBed } from '@angular/core/testing';

import { OptionsRootPathService } from './options-root-path-service';

describe('OptionsRootPathService', () => {
  let service: OptionsRootPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsRootPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
