import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMaxCMakeVersion } from './options-max-cmake-version';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { OptionsMaxCMakeVersionService } from '../services/options-max-cmake-version-service';
import { describe, it, expect, beforeEach } from 'vitest';

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
