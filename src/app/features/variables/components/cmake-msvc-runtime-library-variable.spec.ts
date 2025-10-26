import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeMsvcRuntimeLibraryVariable } from './cmake-msvc-runtime-library-variable';

describe('CMakeMsvcRuntimeLibraryVariable', () => {
  let component: CMakeMsvcRuntimeLibraryVariable;
  let fixture: ComponentFixture<CMakeMsvcRuntimeLibraryVariable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeMsvcRuntimeLibraryVariable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMakeMsvcRuntimeLibraryVariable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
