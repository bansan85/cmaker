import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-tab-item',
  imports: [CommonModule],
  templateUrl: './tab-item.html',
  styleUrl: './tab-item.css',
})
export class TabItem {
  readonly tabName = input<string>('default');
  activate = true;
}
