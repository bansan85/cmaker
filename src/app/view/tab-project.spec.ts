import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProject } from './tab-project';

describe('TabProject', () => {
  let component: TabProject;
  let fixture: ComponentFixture<TabProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
