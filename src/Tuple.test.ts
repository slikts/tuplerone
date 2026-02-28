import Tuple, { getLeaf, prune } from '../src/Tuple';
import WeakishMap from '../src/WeakishMap';
import { describe, it, expect } from 'vitest';
describe(Tuple.name, () => {
  const a = {};
  const { tuple } = Tuple;
  it('constructor throws', () => {
    expect(() => new (Tuple as any)([1, {}], null)).toThrow();
  });

  it('static method constructs', () => {
    expect(tuple(1, {})).toBeInstanceOf(Tuple);
  });

  it('iterates', () => {
    expect([...tuple(1, a)[Symbol.iterator]()]).toEqual([1, a]);
    expect([...tuple(1, a)]).toEqual([1, a]);
  });

  it('can take spread params', () => {
    expect(tuple(...([1, a] as const))).toEqual([1, a]);
  });
});

describe('prune', () => {
  it('prunes unused paths', () => {
    const root = {};
    getLeaf([root, 1, 2, 3]);
    getLeaf([root, 4]);
    prune([root, 1, 2, 3]);
    const leaf = getLeaf([root]) as any;
    // Map should no longer have 1, but still have 4
    expect(leaf.has(1)).toBe(false);
    expect(leaf.has(4)).toBe(true);
  });

  it('skips pruning used paths', () => {
    const root = {};
    getLeaf([root, 1, 2, 3]);
    // Simulate setting a value at [root, 1, 2]
    getLeaf([root, 1, 2]).set(Symbol(), new WeakRef({}));
    prune([root, 1, 2, 3]);
    const leaf = getLeaf([root, 1]) as any;
    expect(leaf.has(2)).toBe(true);
  });
});

describe('getLeaf', () => {
  it('supports unsafe param', () => {
    expect(getLeaf([1, 2, 3], true)).toBeInstanceOf(WeakishMap);
  });
});
