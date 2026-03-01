import { isWeakMapKey, getDefault, getDefaultLazy } from './helpers';

import { describe, it, expect } from 'vitest';

describe('helpers', () => {
  it('isWeakMapKey', () => {
    expect(isWeakMapKey({})).toBe(true);
    expect(isWeakMapKey('a')).toBe(false);
    expect(isWeakMapKey(() => {})).toBe(true);
    expect(isWeakMapKey(Symbol('s'))).toBe(true);
  });

  it('getDefault', () => {
    const m = new Map();
    expect(getDefault(1, 2, m)).toBe(2);
  });

  it('getDefault existing', () => {
    const m = new Map().set(1, 2);
    expect(getDefault(1, 3, m)).toBe(2);
  });

  it('getDefaultLazy', () => {
    const m = new Map();
    expect(getDefaultLazy(1, () => 2, m)).toBe(2);
  });

  it('getDefaultLazy returns existing value without calling init', () => {
    const m = new Map().set(1, 99);
    const init = () => 2;
    expect(getDefaultLazy(1, init, m)).toBe(99);
  });
});
