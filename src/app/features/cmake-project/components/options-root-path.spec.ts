import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsRootPath } from './options-root-path';
import { ProjectContextService } from '../services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { OptionsRootPathService } from '../services/options-root-path-service';
import { mockIPC } from '@tauri-apps/api/mocks';
import { describe, it, expect, beforeEach } from 'vitest';

describe('OptionsRootPath', () => {
  let component: OptionsRootPath;
  let fixture: ComponentFixture<OptionsRootPath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsRootPath],
      providers: [
        ProjectContextService,
        OptionsRootPathService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    mockIPC((cmd, args) => {
      if (cmd === 'path_exists') {
        return true;
      }
      throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
    });

    fixture = TestBed.createComponent(OptionsRootPath);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
