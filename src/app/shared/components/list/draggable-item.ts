import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
})
export class DraggableItemComponent {
  readonly text = input<string>();

  readonly dragStartEvent = output<HTMLElement>();
  readonly dragOverEvent = output<HTMLElement>();
  readonly dragEndEvent = output();

  dragStart(e: DragEvent) {
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/plain', '');
    this.dragStartEvent.emit(e.target as HTMLElement);
  }

  dragOver(e: DragEvent) {
    this.dragOverEvent.emit(e.target as HTMLElement);
  }

  dragEnd() {
    this.dragEndEvent.emit();
  }
}
