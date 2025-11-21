import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectIncludeVariable } from './cmake-project-include-variable';

describe('CMakeProjectIncludeVariable', () => {
  let component: CMakeProjectIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectIncludeVariable],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectIncludeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
