import { TestBed } from '@angular/core/testing';

import { VersionTag } from './version-tag';
import { describe, it, expect, beforeEach } from 'vitest';

describe('VersionTag', () => {
  //let component: VersionTag;
  //let fixture: ComponentFixture<VersionTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionTag],
    }).compileComponents();

    // fixture = TestBed.createComponent(VersionTag);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
