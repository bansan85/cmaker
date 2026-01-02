import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { InputSpdxLicenseDataList } from './input-spdx-license-data-list';

describe('InputLicenseDataList', () => {
  let component: InputSpdxLicenseDataList;
  let fixture: ComponentFixture<InputSpdxLicenseDataList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSpdxLicenseDataList],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSpdxLicenseDataList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
