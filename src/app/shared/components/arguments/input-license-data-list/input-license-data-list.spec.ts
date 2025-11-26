import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLicenseDataList } from './input-license-data-list';

describe('InputLicenseDataList', () => {
  let component: InputLicenseDataList;
  let fixture: ComponentFixture<InputLicenseDataList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLicenseDataList],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLicenseDataList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
