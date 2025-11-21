import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeBeforeVariable } from './cmake-project-include-before-variable';

describe('CMakeProjectIncludeBeforeVariable', () => {
  let component: CMakeProjectIncludeBeforeVariable;
  let fixture: ComponentFixture<CMakeProjectIncludeBeforeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectIncludeBeforeVariable],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectIncludeBeforeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
