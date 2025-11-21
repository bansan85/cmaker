import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeVariable } from './cmake-project-project-name-include-variable';

describe('CMakeProjectProjectNameIncludeVariable', () => {
  let component: CMakeProjectProjectNameIncludeVariable;
  let fixture: ComponentFixture<CMakeProjectProjectNameIncludeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectProjectNameIncludeVariable],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectProjectNameIncludeVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
