import { Version } from './version';
import { describe, it, expect } from 'vitest';

describe('Version', () => {
  it('should create an instance', () => {
    expect(new Version('1.3')).toBeTruthy();
  });
});
