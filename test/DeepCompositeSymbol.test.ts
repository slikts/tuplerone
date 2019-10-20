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
});
