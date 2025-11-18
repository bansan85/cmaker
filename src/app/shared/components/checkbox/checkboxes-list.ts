import { Component, ElementRef, inject, input } from '@angular/core';
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
  expanded: boolean = false;

  elementRef = inject(ElementRef);

  icon = input<string>('menu');

  showCheckboxes() {
    this.expanded = !this.expanded;
  }

  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }
}
