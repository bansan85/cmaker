import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ValidTag } from './valid-tag';

describe('ValidTag', () => {
  //let component: ValidTag;
  //let fixture: ComponentFixture<ValidTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidTag],
    }).compileComponents();

    // fixture = TestBed.createComponent(ValidTag);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
