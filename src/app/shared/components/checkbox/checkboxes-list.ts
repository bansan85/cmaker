import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-checkboxes-list',
  imports: [LucideAngularModule],
  templateUrl: './checkboxes-list.html',
  styleUrl: './checkboxes-list.css',
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
})
export class CheckboxesList {
  protected readonly expanded = signal(false);

  private readonly elementRef = inject(ElementRef);

  readonly icon = input<string>('menu');
  readonly itemsId = input.required<string>();

  showCheckboxes() {
    this.expanded.set(!this.expanded());
  }

  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.expanded.set(false);
    }
  }
}
