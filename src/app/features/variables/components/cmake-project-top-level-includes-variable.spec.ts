import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectTopLevelIncludesVariable } from './cmake-project-top-level-includes-variable';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { mockIPC } from '@tauri-apps/api/mocks';

describe('CMakeProjectTopLevelIncludesVariable', () => {
  let component: CMakeProjectTopLevelIncludesVariable;
  let fixture: ComponentFixture<CMakeProjectTopLevelIncludesVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectTopLevelIncludesVariable],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    mockIPC((cmd, args) => {
      if (cmd === 'relative_paths_exists') {
        return true;
      }
      throw Error(`Mock me ${cmd} / ${JSON.stringify(args)}`);
    });

    fixture = TestBed.createComponent(CMakeProjectTopLevelIncludesVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
