import {
  Component,
  ContentChild,
  contentChild,
  input,
  output,
} from '@angular/core';
import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CMakeComponentInterface } from '../../../features/cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
})
export class DraggableItemComponent {
  @ContentChild(CMAKE_COMPONENT_ITEM)
  child!: CMakeComponentInterface<CMakeFeatureInterface<any>>;

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
