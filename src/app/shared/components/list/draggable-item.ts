import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  output,
} from '@angular/core';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CMakeComponentInterface } from '../../../features/cmake-project/interfaces/cmake-component-interface';
import { CMakeFeatureInterface } from '../../../features/commands/services/cmake-feature-interface';
import { StringService } from '../../services/string-service';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableItemComponent {
  readonly title =
    contentChild<CMakeComponentInterface<CMakeFeatureInterface<unknown>>>(
      CMAKE_COMPONENT_ITEM
    );

  readonly stringService = inject(StringService);

  readonly text = input<string>();

  readonly dragStartEvent = output<HTMLElement>();
  readonly dragOverEvent = output<HTMLElement>();
  readonly dragEndEvent = output<HTMLElement>();

  dragStart(e: DragEvent) {
    console.log(`dragStart`);
    this.dragStartEvent.emit(e.target as HTMLElement);
  }

  dragOver(e: DragEvent) {
    console.log(`dragOver`);
    this.dragOverEvent.emit(e.target as HTMLElement);
  }

  dragEnd(e: DragEvent) {
    console.log(`dragEnd`);
    this.dragEndEvent.emit(e.target as HTMLElement);
  }
}
