/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { dragAndDrop } from './mouse';

describe('dragAndDrop', () => {
  let from: HTMLElement;
  let to: HTMLElement;

  beforeEach(() => {
    // On réinitialise le DOM avant chaque test
    document.body.innerHTML = `
      <div id="source" draggable="true">Source</div>
      <div id="target">Cible</div>
    `;
    from = document.getElementById('source')!;
    to = document.getElementById('target')!;
  });

  test('should generate events', () => {
    const events: string[] = [];

    const logEvent = (e: Event) => events.push(e.type);

    from.addEventListener('dragstart', logEvent);
    to.addEventListener('dragover', logEvent);
    to.addEventListener('drop', logEvent);
    from.addEventListener('dragend', logEvent);

    dragAndDrop(from, to);

    expect(events).toEqual(['dragstart', 'dragover', 'drop', 'dragend']);
  });

  test('should have same properties', () => {
    const spy = vi.fn();
    from.addEventListener('dragstart', spy);

    dragAndDrop(from, to);

    const event = spy.mock.calls[0][0] as DragEvent;
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);
  });
});
