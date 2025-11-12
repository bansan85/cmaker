import { Component, input } from "@angular/core";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-checkboxes-list",
  imports: [LucideAngularModule],
  templateUrl: "./checkboxes-list.html",
  styleUrl: "./checkboxes-list.css",
})
export class CheckboxesList {
  expanded: boolean = false;

  icon = input<string>("menu");

  showCheckboxes() {
    this.expanded = !this.expanded;
  }
}
