import { CommonModule } from "@angular/common";
import { Component, ContentChildren, QueryList } from "@angular/core";
import { TabItem } from "./tab-item";

@Component({
  selector: "app-ui-tabs",
  imports: [CommonModule],
  templateUrl: "./tabs.html",
  styleUrl: "./tabs.css",
})
export class Tabs {
  @ContentChildren(TabItem) tabs!: QueryList<TabItem>;
  activeComponent!: TabItem;

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
  }

  activateTab(tab: TabItem) {
    this.activeComponent = tab;
  }
}
