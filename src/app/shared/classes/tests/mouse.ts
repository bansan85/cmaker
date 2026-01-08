export function dragAndDrop(from: HTMLElement, to: HTMLElement) {
  const dragStartEvent = new DragEvent('dragstart', {
    bubbles: true,
    cancelable: true,
    dataTransfer: new DataTransfer(),
  });
  from.dispatchEvent(dragStartEvent);
  const dragOverEvent = new DragEvent('dragover', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dragStartEvent.dataTransfer,
  });
  to.dispatchEvent(dragOverEvent);
  const dropEvent = new DragEvent('drop', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dragStartEvent.dataTransfer,
  });
  to.dispatchEvent(dropEvent);
  const dragEndEvent = new DragEvent('dragend', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dragStartEvent.dataTransfer,
  });
  from.dispatchEvent(dragEndEvent);
}
