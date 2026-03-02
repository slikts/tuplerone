import Tuple from './Tuple';
import { describe, it, expect } from 'vitest';

describe(Tuple.name, () => {
  const a = {};
  const { tuple } = Tuple;
  it('constructor throws', () => {
    // @ts-expect-error -- testing that the constructor throws when localToken is missing
    expect(() => new Tuple([1, {}], null)).toThrow();
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

  it('constructs 0-tuple singleton', () => {
    expect(tuple()).toBeInstanceOf(Tuple);
    expect(tuple()).toBe(tuple()); // same reference
    expect(tuple().length).toBe(0);
  });

  it('symbol() returns a unique symbol for the same values', () => {
    const { symbol } = Tuple;
    expect(typeof symbol(a)).toBe('symbol');
    expect(symbol(a)).toBe(symbol(a)); // same reference
  });

  it('unsafe() returns a tuple for all-primitive values', () => {
    const { unsafe } = Tuple;
    expect(unsafe(1, 2)).toBeInstanceOf(Tuple);
    expect(unsafe(1, 2)).toBe(unsafe(1, 2)); // same reference
  });

  it('unsafeSymbol() returns a symbol for all-primitive values', () => {
    const { unsafeSymbol } = Tuple;
    expect(typeof unsafeSymbol(1, 2)).toBe('symbol');
    expect(unsafeSymbol(1, 2)).toBe(unsafeSymbol(1, 2));
  });
});
