import { getLeaf, prune, getUnsafeLeaf } from './cache';
import WeakishMap from './WeakishMap';
import { describe, it, expect } from 'vitest';

describe('getLeaf', () => {
  it('supports unsafe param for all-primitive values', () => {
    expect(getLeaf([1, 2, 3], true)).toBeInstanceOf(WeakishMap);
  });

  it('throws when all values are primitives without unsafe flag', () => {
    expect(() => getLeaf([1, 2, 3])).toThrow(TypeError);
  });

  it('pads root when first value is not a weak map key', () => {
    const obj = {};
    // primitives first, then an object: should route through the offset path
    const leaf = getLeaf([1, obj]);
    expect(leaf).toBeInstanceOf(WeakishMap);
  });
});

describe('prune', () => {
  it('returns early when all values are primitives (no weak map key)', () => {
    // Should not throw and just return early
    expect(() => prune([1, 2, 3])).not.toThrow();
  });

  it('prunes unused paths', () => {
    const root = {};
    getLeaf([root, 1, 2, 3]);
    getLeaf([root, 4]);
    prune([root, 1, 2, 3]);
    const leaf = getLeaf([root]);
    expect(leaf.has(1)).toBe(false);
    expect(leaf.has(4)).toBe(true);
  });

  it('skips pruning used paths', () => {
    const root = {};
    getLeaf([root, 1, 2, 3]);
    getLeaf([root, 1, 2]).set(Symbol(), new WeakRef({}));
    prune([root, 1, 2, 3]);
    const leaf = getLeaf([root, 1]);
    expect(leaf.has(2)).toBe(true);
  });

  it('returns early when intermediate node is missing during prune', () => {
    const root = {};
    // Prune a path that was never created
    expect(() => prune([root, 'never-set', 'deeper'])).not.toThrow();
  });

  it('handles rootValue not being the first value (offset root)', () => {
    const obj = {};
    // First value is a primitive, second is an object — rootValue !== values[0]
    getLeaf([1, obj]);
    expect(() => prune([1, obj])).not.toThrow();
  });
});

describe('getUnsafeLeaf', () => {
  it('returns a Map for all-primitive values', () => {
    expect(getUnsafeLeaf([1, 2, 3])).toBeInstanceOf(Map);
  });

  it('returns the same nested Map for the same path', () => {
    const leaf1 = getUnsafeLeaf(['a', 'b']);
    const leaf2 = getUnsafeLeaf(['a', 'b']);
    expect(leaf1).toBe(leaf2);
  });
});
