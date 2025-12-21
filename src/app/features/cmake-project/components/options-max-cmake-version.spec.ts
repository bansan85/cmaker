import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMaxCMakeVersion } from './options-max-cmake-version';

describe('OptionsMaxCMakeVersion', () => {
  let component: OptionsMaxCMakeVersion;
  let fixture: ComponentFixture<OptionsMaxCMakeVersion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsMaxCMakeVersion],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsMaxCMakeVersion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
