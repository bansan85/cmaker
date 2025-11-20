import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProjectView } from './full-project-view';

describe('FullProjectView', () => {
  let component: FullProjectView;
  let fixture: ComponentFixture<FullProjectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullProjectView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullProjectView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
