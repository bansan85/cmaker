import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProjectTopLevelIncludesVariable } from './cmake-project-top-level-includes-variable';

describe('CMakeProjectTopLevelIncludesVariable', () => {
  let component: CMakeProjectTopLevelIncludesVariable;
  let fixture: ComponentFixture<CMakeProjectTopLevelIncludesVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProjectTopLevelIncludesVariable],
    }).compileComponents();

    fixture = TestBed.createComponent(CMakeProjectTopLevelIncludesVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
