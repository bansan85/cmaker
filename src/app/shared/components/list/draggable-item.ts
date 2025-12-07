import { Component, contentChild, input, output } from '@angular/core';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CMakeComponentInterface } from '../../../features/cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
})
export class DraggableItemComponent {
  readonly title =
    contentChild<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>(
      CMAKE_COMPONENT_ITEM
    );

  readonly text = input<string>();

  readonly dragStartEvent = output<HTMLElement>();
  readonly dragOverEvent = output<HTMLElement>();
  readonly dragEndEvent = output();

  dragStart(e: DragEvent) {
    if (e.dataTransfer === null) {
      throw new Error('Invalid event while dragging.');
    }
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
    this.dragStartEvent.emit(e.target as HTMLElement);
  }

  dragOver(e: DragEvent) {
    this.dragOverEvent.emit(e.target as HTMLElement);
  }

  dragEnd() {
    this.dragEndEvent.emit();
  }
}
