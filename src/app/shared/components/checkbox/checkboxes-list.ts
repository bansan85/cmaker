import { Component } from "@angular/core";
import { LucideAngularModule, Menu } from "lucide-angular";

@Component({
  selector: "app-checkboxes-list",
  imports: [LucideAngularModule],
  templateUrl: "./checkboxes-list.html",
  styleUrl: "./checkboxes-list.css",
})
export class CheckboxesList {
  expanded: boolean = false;

  showCheckboxes() {
    this.expanded = !this.expanded;
  }
}
