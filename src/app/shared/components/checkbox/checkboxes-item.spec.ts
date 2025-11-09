import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesItem } from './checkboxes-item';

describe('CheckboxesItem', () => {
  let component: CheckboxesItem;
  let fixture: ComponentFixture<CheckboxesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxesItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
