import { Component, input } from "@angular/core";
import { CheckboxesItemInterface } from "../../interface/checkboxes-item-interface";

@Component({
  selector: "app-checkboxes-item",
  imports: [],
  templateUrl: "./checkboxes-item.html",
  styleUrl: "./checkboxes-item.css",
})
export class CheckboxesItem {
  element = input.required<CheckboxesItemInterface>();
}
