import { describe, expect, it } from 'vitest';

import { MockIpc } from './mock-ipc';

describe('MockIpc', () => {
  it('should create an instance', () => {
    expect(new MockIpc()).toBeTruthy();
  });
});
