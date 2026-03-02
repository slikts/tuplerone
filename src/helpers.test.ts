import {
  isWeakMapKey,
  getDefault,
  getDefaultLazy,
  forEach,
  assignArraylike,
  arraylikeToIterable,
} from './helpers';

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

  it('forEach iterates over all values', () => {
    const values: number[] = [];
    forEach([1, 2, 3][Symbol.iterator](), (v) => values.push(v));
    expect(values).toEqual([1, 2, 3]);
  });

  it('forEach handles empty iterator', () => {
    const values: number[] = [];
    forEach([][Symbol.iterator](), (v) => values.push(v));
    expect(values).toEqual([]);
  });

  it('assignArraylike sets index properties', () => {
    const target: Record<number, string> = {};
    const count = assignArraylike(['a', 'b', 'c'][Symbol.iterator](), target);
    expect(count).toBe(3);
    expect(target[0]).toBe('a');
    expect(target[1]).toBe('b');
    expect(target[2]).toBe('c');
  });

  it('arraylikeToIterable iterates over arraylike', () => {
    const source = { 0: 'x', 1: 'y', length: 2 };
    const result = [...arraylikeToIterable(source)];
    expect(result).toEqual(['x', 'y']);
  });

  it('arraylikeToIterable handles empty arraylike', () => {
    const source = { length: 0 };
    const result = [...arraylikeToIterable(source)];
    expect(result).toEqual([]);
  });

  it('arraylikeToIterable is re-iterable via Symbol.iterator', () => {
    const source = { 0: 1, 1: 2, length: 2 };
    const iterable = arraylikeToIterable(source);
    const first = [...iterable];
    const second = [...iterable[Symbol.iterator]()];
    expect(first).toEqual([1, 2]);
    expect(second).toEqual([1, 2]);
  });
});
