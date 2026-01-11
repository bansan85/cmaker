import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { TabTarget } from './tab-target';

describe('TabTarget', () => {
  let component: TabTarget;
  let fixture: ComponentFixture<TabTarget>;
  describe('Shallow Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabTarget],
      }).compileComponents();

      fixture = TestBed.createComponent(TabTarget);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should support Shallow', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Full Component Testing', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TabTarget],
      }).compileComponents();

      fixture = TestBed.createComponent(TabTarget);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should support full', () => {
      expect(component).toBeTruthy();
    });
  });
});
