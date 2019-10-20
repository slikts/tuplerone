import { UnsafeNamedSymbolTuple } from '../src/tuplerone';

describe('UnsafeNamedSymbolTuple', () => {
  it('constructs', () => {
    expect(typeof UnsafeNamedSymbolTuple({ a: 1, b: 2 })).toBe('symbol');
  });

  it('structurally equals object', () => {
    expect(UnsafeNamedSymbolTuple({ a: 1, b: 2 })).toBe(UnsafeNamedSymbolTuple({ a: 1, b: 2 }));
  });

  it("doesn't equal structurally different object", () => {
    expect(UnsafeNamedSymbolTuple({ a: 1, b: 2 })).not.toBe(UnsafeNamedSymbolTuple({ a: 1, b: 3 }));
  });

  it('supports deep structural equality', () => {
    const o = () => ({ a: { c: 1 }, b: 2 });
    expect(UnsafeNamedSymbolTuple(o())).toBe(UnsafeNamedSymbolTuple(o()));
    expect(UnsafeNamedSymbolTuple(o())).not.toBe(UnsafeNamedSymbolTuple({}));
  });
});
