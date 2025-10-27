import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from "@angular/core";
import { DraggableItemComponent } from "./draggable-item";

@Component({
  selector: "app-draggable-list",
  templateUrl: "./draggable-list.html",
})
export class DraggableListComponent implements AfterContentInit {
  @ContentChildren(DraggableItemComponent)
  items!: QueryList<DraggableItemComponent>;
  draggedEl!: HTMLElement;

  ngAfterContentInit() {
    this.items.forEach((item) => {
      item.dragStartEvent.subscribe((el) => (this.draggedEl = el));
      item.dragOverEvent.subscribe((target) => this.onDragOver(target));
    });
  }

  private getDraggableItemEl(el: HTMLElement): HTMLElement | null {
    while (el && !el.hasAttribute("draggable")) {
      el = el.parentElement as HTMLElement;
    }
    return el || null;
  }

  onDragStart(el: HTMLElement) {
    this.draggedEl = el;
  }

  onDragOver(targetEl: HTMLElement) {
    const target = this.getDraggableItemEl(targetEl);
    if (!target || !this.draggedEl || target === this.draggedEl) return;

    if (this.isBefore(this.draggedEl, target))
      target.parentNode!.insertBefore(this.draggedEl, target);
    else target.parentNode!.insertBefore(this.draggedEl, target.nextSibling);
  }

  private isBefore(el1: HTMLElement, el2: HTMLElement) {
    if (el2.parentNode === el1.parentNode)
      for (
        let cur = el1.previousSibling as HTMLElement | null;
        cur;
        cur = cur.previousSibling as HTMLElement | null
      )
        if (cur === el2) return true;
    return false;
  }
}
