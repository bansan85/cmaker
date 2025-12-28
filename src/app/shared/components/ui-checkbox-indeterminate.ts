import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-ui-checkbox-indeterminate',
  imports: [],
  templateUrl: './ui-checkbox-indeterminate.html',
  styleUrl: './ui-checkbox-indeterminate.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckboxIndeterminate {
  protected value: boolean | null = null;

  readonly checked = output<boolean | null>();

  toggle(): void {
    if (this.value === true) {
      this.value = null;
    } else if (this.value === null) {
      this.value = false;
    } else {
      this.value = true;
    }

    this.checked.emit(this.value);
  }
}
