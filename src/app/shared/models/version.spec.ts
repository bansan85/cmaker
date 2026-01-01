import { describe, expect,it } from 'vitest';

import { Version } from './version';

describe('Version', () => {
  it('should create an instance', () => {
    expect(new Version('1.3')).toBeTruthy();
  });
});
