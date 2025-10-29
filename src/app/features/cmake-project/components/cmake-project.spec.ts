import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMakeProject } from './cmake-project';

describe('CMakeProject', () => {
  let component: CMakeProject;
  let fixture: ComponentFixture<CMakeProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMakeProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMakeProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
