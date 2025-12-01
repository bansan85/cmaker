import { Component, contentChildren, effect, output } from '@angular/core';
import { DraggableItemComponent } from './draggable-item';

@Component({
  selector: 'app-draggable-list',
  templateUrl: './draggable-list.html',
})
export class DraggableListComponent {
  private readonly items = contentChildren(DraggableItemComponent);
  private draggableItem!: HTMLElement;

  private subscribedItems = new Set<DraggableItemComponent>();

  private from = 0;
  private to = 0;

  readonly orderChanged = output<{ from: number; to: number }>();

  constructor() {
    effect(() => {
      const currentItems = this.items();

      this.subscribedItems.forEach((item) => {
        if (!currentItems.includes(item)) {
          this.subscribedItems.delete(item);
        }
      });

      currentItems.forEach((item) => {
        if (!this.subscribedItems.has(item)) {
          this.subscribedItems.add(item);
          item.dragStartEvent.subscribe((target) => {
            this.onDragStart(target);
          });
          item.dragOverEvent.subscribe((target) => {
            this.onDragOver(target);
          });
          item.dragEndEvent.subscribe(() => {
            this.onDragEnd();
          });
        }
      });
    });
  }

  private getDraggableItemEl(el: HTMLElement | null): HTMLElement {
    while (el && !el.hasAttribute('draggable')) {
      el = el.parentElement;
    }
    return el!;
  }

  onDragStart(targetEl: HTMLElement) {
    this.draggableItem = this.getDraggableItemEl(targetEl)
      .parentNode as HTMLElement;

    this.from = Array.from(this.draggableItem.parentNode!.children).indexOf(
      this.draggableItem
    );
    this.to = this.from;
  }

  onDragOver(targetEl: HTMLElement) {
    const target = this.getDraggableItemEl(targetEl);
    // Don't move over itself.
    if (target.parentNode === this.draggableItem) {
      return;
    }
    const draggableItem = target.parentNode as HTMLElement;

    this.to = Array.from(this.draggableItem.parentNode!.children).indexOf(
      draggableItem
    );

    if (this.isBefore(this.draggableItem, draggableItem)) {
      draggableItem.parentNode!.insertBefore(this.draggableItem, draggableItem);
    } else {
      draggableItem.parentNode!.insertBefore(
        this.draggableItem,
        draggableItem.nextSibling
      );
    }
  }

  onDragEnd() {
    if (this.from === this.to) {
      return;
    }

    this.orderChanged.emit({ from: this.from, to: this.to });
  }

  private isBefore(el1: HTMLElement, el2: HTMLElement) {
    if (el2.parentNode === el1.parentNode) {
      for (
        let cur = el1.previousSibling as HTMLElement | null;
        cur;
        cur = cur.previousSibling as HTMLElement | null
      ) {
        if (cur === el2) {
          return true;
        }
      }
    }
    return false;
  }
}
