import { Component } from "@angular/core";

@Component({
  selector: "app-ui-checkbox-indeterminate",
  imports: [],
  templateUrl: "./ui-checkbox-indeterminate.html",
  styleUrl: "./ui-checkbox-indeterminate.css",
})
export class UiCheckboxIndeterminate {
  value?: boolean;

  toggle(): void {
    if (this.value === true) this.value = undefined;
    else if (this.value === undefined) this.value = false;
    else this.value = true;
  }
}
