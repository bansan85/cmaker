import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { TabTarget } from './tab-target';

describe('TabTarget', () => {
  let component: TabTarget;
  let fixture: ComponentFixture<TabTarget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTarget],
    }).compileComponents();

    fixture = TestBed.createComponent(TabTarget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
