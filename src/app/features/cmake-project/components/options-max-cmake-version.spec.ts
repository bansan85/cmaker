import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';
import { ProjectContextService } from '../services/project-context-service';
import { OptionsMaxCMakeVersion } from './options-max-cmake-version';

describe('OptionsMaxCMakeVersion', () => {
  let component: OptionsMaxCMakeVersion;
  let fixture: ComponentFixture<OptionsMaxCMakeVersion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsMaxCMakeVersion],
      providers: [
        OptionsMaxCMakeVersionService,
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsMaxCMakeVersion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
