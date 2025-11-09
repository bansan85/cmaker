import { Component } from "@angular/core";

@Component({
  selector: "app-checkboxes-list",
  imports: [],
  templateUrl: "./checkboxes-list.html",
  styleUrl: "./checkboxes-list.css",
})
export class CheckboxesList {
  expanded: boolean = false;

  showCheckboxes() {
    this.expanded = !this.expanded;
  }
}
