import { TestBed } from '@angular/core/testing';

import { OptionsMaxCMakeVersionService } from './options-max-cmake-version-service';
import { ProjectContextService } from './project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';

describe('OptionsMaxCMakeVersionService', () => {
  let service: OptionsMaxCMakeVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectContextService,
        OptionsMaxCMakeVersionService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    });
    service = TestBed.inject(OptionsMaxCMakeVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
