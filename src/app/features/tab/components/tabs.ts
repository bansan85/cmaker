import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, contentChildren } from '@angular/core';
import { TabItem } from './tab-item';

@Component({
  selector: 'app-ui-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements AfterContentInit {
  readonly tabs = contentChildren(TabItem);

  activeComponent = 0;

  ngAfterContentInit() {
    this.activateTab(0);
  }

  activateTab(index: number) {
    this.activeComponent = index;
    this.tabs().forEach((tab, i) => {
      tab.activate = i === index;
    });
  }
}
