import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';

import { CMAKE_COMPONENT_ITEM } from '../../../app.tokens';
import { CMakeComponentInterface } from '../../../features/cmake-project/models/cmake-component-interface';
import { StringService } from '../../services/string-service';

@Component({
  selector: 'app-draggable-item',
  templateUrl: './draggable-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableItemComponent implements AfterViewInit, OnDestroy {
  readonly title =
    contentChild<CMakeComponentInterface<unknown>>(CMAKE_COMPONENT_ITEM);

  readonly stringService = inject(StringService);

  readonly text = input<string>();

  // Need to disable mouse event for textarea / input area.
  // Either, you will not be able to perform a mouse selection.
  // It must be dynamic because TabOptions can be hide (and DOM destroyed)
  // due to tab manager.
  readonly el = inject(ElementRef<HTMLElement>);
  private observer!: MutationObserver;

  protected readonly isDraggable = signal(true);

  private readonly onInputMouseEnter = () => {
    this.isDraggable.set(false);
  };

  private readonly onInputMouseLeave = () => {
    this.isDraggable.set(true);
  };

  ngAfterViewInit(): void {
    this.observer = new MutationObserver(() => {
      this.attachListeners();
    });
    this.observer.observe(this.el.nativeElement as Node, {
      childList: true,
      subtree: true,
    });
    this.attachListeners();
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private attachListeners(): void {
    this.el.nativeElement
      .querySelectorAll('textarea, input')
      .forEach((element: HTMLTextAreaElement) => {
        element.removeEventListener('mouseenter', this.onInputMouseEnter);
        element.removeEventListener('mouseleave', this.onInputMouseLeave);
        element.addEventListener('mouseenter', this.onInputMouseEnter);
        element.addEventListener('mouseleave', this.onInputMouseLeave);
      });
  }

  readonly dragStartEvent = output<HTMLElement>();
  readonly dragOverEvent = output<HTMLElement>();
  readonly dragEndEvent = output<HTMLElement>();

  dragStart(e: DragEvent) {
    this.dragStartEvent.emit(e.target as HTMLElement);
  }

  dragOver(e: DragEvent) {
    this.dragOverEvent.emit(e.target as HTMLElement);
  }

  dragEnd(e: DragEvent) {
    this.dragEndEvent.emit(e.target as HTMLElement);
  }
}
