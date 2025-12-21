import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsRootPath } from './options-root-path';

describe('OptionsRootPath', () => {
  let component: OptionsRootPath;
  let fixture: ComponentFixture<OptionsRootPath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsRootPath]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsRootPath);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
