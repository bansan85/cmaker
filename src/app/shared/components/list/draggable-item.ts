import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
})
export class DraggableItemComponent {
  @Input() text!: string;

  @Output() dragStartEvent = new EventEmitter<HTMLElement>();
  @Output() dragOverEvent = new EventEmitter<HTMLElement>();
  @Output() dragEndEvent = new EventEmitter();

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
