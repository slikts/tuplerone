import { DeepCompositeSymbol } from '../src/tuplerone';
import { shallow } from '../src/shallow';
import { describe, it, expect } from 'vitest';

describe(DeepCompositeSymbol.name, () => {
  it('constructs', () => {
    expect(typeof DeepCompositeSymbol({ a: 1, b: 2 })).toBe('symbol');
  });

  it('supports empty objects and arrays', () => {
    expect(DeepCompositeSymbol({})).toBe(DeepCompositeSymbol({}));
    expect(DeepCompositeSymbol([])).toBe(DeepCompositeSymbol([]));
  });

  it('structurally equals object', () => {
    expect(DeepCompositeSymbol({ a: 1, b: 2 })).toBe(DeepCompositeSymbol({ a: 1, b: 2 }));
  });

  it("doesn't equal structurally different object", () => {
    expect(DeepCompositeSymbol({ a: 1, b: 2 })).not.toBe(DeepCompositeSymbol({ a: 1, b: 3 }));
  });

  it('supports arrays', () => {
    expect(DeepCompositeSymbol(['1', 2, 3])).toBe(DeepCompositeSymbol(['1', 2, 3]));
    expect(DeepCompositeSymbol([1, 2, 3, 4])).not.toBe(DeepCompositeSymbol([1, 2, 3]));
  });

  it('supports deep nesting', () => {
    expect(DeepCompositeSymbol([1, [2, 3]])).toBe(
      DeepCompositeSymbol([1, DeepCompositeSymbol([2, 3])]),
    );
    expect(DeepCompositeSymbol({ a: { b: 1, c: 2 } })).toBe(
      DeepCompositeSymbol({ a: DeepCompositeSymbol({ b: 1, c: 2 }) }),
    );
    expect(DeepCompositeSymbol([1, { a: 1 }])).toBe(DeepCompositeSymbol([1, { a: 1 }]));
    expect(DeepCompositeSymbol([1, { a: 1 }])).toBe(
      DeepCompositeSymbol([1, DeepCompositeSymbol({ a: 1 })]),
    );
    expect(DeepCompositeSymbol({ a: 1, b: [2, 3] })).toBe(
      DeepCompositeSymbol({ a: 1, b: DeepCompositeSymbol([2, 3]) }),
    );
  });

  it('supports deep structural equality', () => {
    const o = () => ({ a: { c: 1 }, b: 2 });
    expect(DeepCompositeSymbol(o())).toBe(DeepCompositeSymbol(o()));
    expect(DeepCompositeSymbol(o())).not.toBe(DeepCompositeSymbol({}));
  });

  it('allows filtering by key', () => {
    const o1 = { a: { c: 1 }, b: 2, _d: 3 };
    const o2 = { ...o1, _d: 4 };
    const filter = ([key]: [string, unknown]) => !key.startsWith('_');
    expect(DeepCompositeSymbol(o1, filter)).toBe(DeepCompositeSymbol(o2, filter));
    expect(DeepCompositeSymbol(o1)).not.toBe(DeepCompositeSymbol(o2));
  });

  it('allows filtering by key recursively', () => {
    const o1 = { a: { c: 1 }, b: 2, _d: 3 };
    const o2 = { ...o1, a: { ...o1.a, _e: 4 } };
    const filter = ([key]: [string, unknown]) => !key.startsWith('_');
    expect(DeepCompositeSymbol(o1, filter)).toBe(DeepCompositeSymbol(o2, filter));
    expect(DeepCompositeSymbol(o1)).not.toBe(DeepCompositeSymbol(o2));
  });

  it('skips shallow', () => {
    const o: Record<string, number> = shallow({ a: 1 });
    expect(DeepCompositeSymbol([o])).not.toBe(DeepCompositeSymbol([{ a: 1 }]));
    const s = DeepCompositeSymbol([o]);
    o.b = 2;
    expect(s).toBe(DeepCompositeSymbol([o]));
  });
});
