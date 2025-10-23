import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCheckboxIndeterminate } from './ui-checkbox-indeterminate';

describe('UiCheckboxIndeterminate', () => {
  let component: UiCheckboxIndeterminate;
  let fixture: ComponentFixture<UiCheckboxIndeterminate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCheckboxIndeterminate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCheckboxIndeterminate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
