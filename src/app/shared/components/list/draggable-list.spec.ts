import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { DraggableListComponent } from './draggable-list';

describe('DraggableListComponent', () => {
  let component: DraggableListComponent;
  let fixture: ComponentFixture<DraggableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraggableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
