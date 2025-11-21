import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectProjectNameIncludeBeforeVariable } from './cmake-project-project-name-include-before-variable';

describe('CMakeProjectProjectNameIncludeBeforeVariable', () => {
  let component: CMakeProjectProjectNameIncludeBeforeVariable;
  let fixture: ComponentFixture<CMakeProjectProjectNameIncludeBeforeVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectProjectNameIncludeBeforeVariable],
    }).compileComponents();

    fixture = TestBed.createComponent(
      CMakeProjectProjectNameIncludeBeforeVariable
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
