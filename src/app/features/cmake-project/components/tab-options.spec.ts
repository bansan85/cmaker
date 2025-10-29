import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOptions } from './tab-options';

describe('TabOptions', () => {
  let component: TabOptions;
  let fixture: ComponentFixture<TabOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
