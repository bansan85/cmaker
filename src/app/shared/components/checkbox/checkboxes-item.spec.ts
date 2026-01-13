import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it } from 'vitest';

import { DEFAULT_MAX_VERSION } from '../../../app.tokens';
import { ProjectContextService } from '../../../features/cmake-project/services/project-context-service';
import { Version } from '../../models/version';
import { CheckboxesItem } from './checkboxes-item';

describe('CheckboxesItem', () => {
  //let component: CheckboxesItem;
  //let fixture: ComponentFixture<CheckboxesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesItem],
      providers: [
        ProjectContextService,
        { provide: DEFAULT_MAX_VERSION, useValue: new Version(4, 3) },
      ],
    }).compileComponents();

    //fixture = TestBed.createComponent(CheckboxesItem);
    //component = fixture.componentInstance;
    //fixture.componentRef.setInput('element', {
    //  enabled: false,
    //  name: 'ASM-ATT',
    //});
    //fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
