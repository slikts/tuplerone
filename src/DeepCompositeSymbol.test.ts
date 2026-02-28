import { DeepCompositeSymbol } from '../src/tuplerone';

describe(DeepCompositeSymbol.name, () => {
  it('constructs', () => {
    expect(typeof DeepCompositeSymbol({ a: 1, b: 2 })).toBe('symbol');
  });

  it('structurally equals object', () => {
    expect(DeepCompositeSymbol({ a: 1, b: 2 })).toBe(DeepCompositeSymbol({ a: 1, b: 2 }));
  });

  it("doesn't equal structurally different object", () => {
    expect(DeepCompositeSymbol({ a: 1, b: 2 })).not.toBe(DeepCompositeSymbol({ a: 1, b: 3 }));
  });

  it('supports deep structural equality', () => {
    const o = () => ({ a: { c: 1 }, b: 2 });
    expect(DeepCompositeSymbol(o())).toBe(DeepCompositeSymbol(o()));
    expect(DeepCompositeSymbol(o())).not.toBe(DeepCompositeSymbol({}));
  });

  it('allows filtering by key', () => {
    const o1 = { a: { c: 1 }, b: 2, _d: 3 };
    const o2 = { ...o1, _d: 4 };
    const filter = ([key]: [string, any]) => !key.startsWith('_');
    expect(DeepCompositeSymbol(o1, filter)).toBe(DeepCompositeSymbol(o2, filter));
    expect(DeepCompositeSymbol(o1)).not.toBe(DeepCompositeSymbol(o2));
  });

  it('allows filtering by key recursively', () => {
    const o1 = { a: { c: 1 }, b: 2, _d: 3 };
    const o2 = { ...o1, a: { ...o1.a, _e: 4 } };
    const filter = ([key]: [string, any]) => !key.startsWith('_');
    expect(DeepCompositeSymbol(o1, filter)).toBe(DeepCompositeSymbol(o2, filter));
    expect(DeepCompositeSymbol(o1)).not.toBe(DeepCompositeSymbol(o2));
  });
});
