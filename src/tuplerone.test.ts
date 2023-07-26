import { Tuple, CompositeSymbol } from './tuplerone';

describe(Tuple.name, () => {
  const a = Object('a');
  const b = Object('b');
  const c = Object('c');

  it('1-tuple objects compare', () => {
    expect(Tuple(a)).toBe(Tuple(a));
  });

  it('2-tuple objects compare', () => {
    expect(Tuple(a, b)).toBe(Tuple(a, b));
  });

  it('3-tuple objects compare', () => {
    expect(Tuple(a, b, c)).toBe(Tuple(a, b, c));
    expect(Tuple(a, b, c)).not.toBe(Tuple(a, b));
  });

  it('all-primitive tuples throw', () => {
    expect(() => Tuple(1, 2, 3)).toThrow();
  });

  it('root object tuple compares', () => {
    expect(Tuple(a, 1, 2)).toBe(Tuple(a, 1, 2));
  });

  it('non-root object tuple compares', () => {
    expect(Tuple(1, 2, a)).toBe(Tuple(1, 2, a));
  });

  it('2-tuple different roots not compare', () => {
    expect(Tuple(a, 1)).not.toBe(Tuple(a, 2));
  });

  it('2-tuple different roots reverse not compare', () => {
    expect(Tuple(1, a)).not.toBe(Tuple(2, a));
  });

  it('3-tuple different roots not compare', () => {
    expect(Tuple(a, 1, 2)).not.toBe(Tuple(a, 2, 1));
  });

  it('overlapping not compare', () => {
    expect(Tuple(a, 1, 2)).not.toBe(Tuple(a, 1));
    expect(Tuple(1, a, 2)).not.toBe(Tuple(1, a));
  });

  it('sets length', () => {
    expect(Tuple().length).toBe(0);
    expect(Tuple({}).length).toBe(1);
    expect(Tuple({}, {}).length).toBe(2);
  });
});

describe('tuple symbol', () => {
  it('is of type symbol', () => {
    expect(typeof CompositeSymbol(1 as const, 2, {})).toBe('symbol');
  });

  it('compares', () => {
    const a = {};
    expect(CompositeSymbol(1, 2, a)).toBe(CompositeSymbol(1, 2, a));
  });
});

describe('other', () => {
  it('0-tuple', () => {
    expect(Tuple()).toBe(Tuple());
    expect(Tuple()).not.toBe(Tuple({}));
  });
});
