import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckboxesList } from "./checkboxes-list";
import { importProvidersFrom } from "@angular/core";
import { LucideAngularModule, Menu } from "lucide-angular";

describe("CheckboxesList", () => {
  let component: CheckboxesList;
  let fixture: ComponentFixture<CheckboxesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesList],
      providers: [importProvidersFrom(LucideAngularModule.pick({ Menu }))],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
