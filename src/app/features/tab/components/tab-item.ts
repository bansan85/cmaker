import { Component, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-tab-item',
  imports: [CommonModule],
  templateUrl: './tab-item.html',
  styleUrl: './tab-item.css',
})
export class TabItem {
  @Input() tabName? = 'default';
  activate = true;
}
