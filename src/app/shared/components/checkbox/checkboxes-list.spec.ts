import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesList } from './checkboxes-list';

describe('CheckboxesList', () => {
  let component: CheckboxesList;
  let fixture: ComponentFixture<CheckboxesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
