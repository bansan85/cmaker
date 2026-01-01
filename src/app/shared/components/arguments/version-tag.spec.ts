import { TestBed } from '@angular/core/testing';
import { beforeEach,describe, expect, it } from 'vitest';

import { VersionTag } from './version-tag';

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
