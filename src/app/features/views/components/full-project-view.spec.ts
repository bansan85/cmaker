import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { Version } from '../../../shared/models/version';
import { ProjectContextService } from '../../cmake-project/services/project-context-service';
import { FullProjectView } from './full-project-view';

describe('FullProjectView', () => {
  let component: FullProjectView;
  let fixture: ComponentFixture<FullProjectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullProjectView],
      providers: [
        ProjectContextService,
        {
          provide: DEFAULT_MAX_VERSION,
          useValue: new Version(4, 3),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullProjectView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
