import { Tuple } from './Tuple';

describe(`Tuple`, () => {
  const a = Object('a');
  const b = Object('b');
  const c = Object('c');

  it('constructs', () => {
    expect(Tuple(1, {})).toBeInstanceOf(Tuple);
    expect(Tuple.name).toBe('Tuple');
  });

  it('is array', () => {
    expect(Array.isArray(Tuple())).toBe(true);
  });

  it('supports 0-tuples', () => {
    expect(Tuple()).toStrictEqual(Tuple());
    expect(Tuple()).not.toStrictEqual(Tuple(1));
  });

  it('supports objects', () => {
    const o = {};
    expect(Tuple(o, 1, 2)).toStrictEqual(Tuple(o, 1, 2));
  });

  it('1-tuple objects compare', () => {
    expect(Tuple(a)).toStrictEqual(Tuple(a));
  });

  it('2-tuple objects compare', () => {
    expect(Tuple(a, b)).toStrictEqual(Tuple(a, b));
  });

  it('3-tuple objects compare', () => {
    expect(Tuple(a, b, c)).toStrictEqual(Tuple(a, b, c));
    expect(Tuple(a, b, c)).not.toStrictEqual(Tuple(a, b));
  });

  it('overlapping not compare', () => {
    expect(Tuple(a, 1, 2)).not.toStrictEqual(Tuple(a, 1));
    expect(Tuple(1, a, 2)).not.toStrictEqual(Tuple(1, a));
  });

  it('sets length', () => {
    expect(Tuple().length).toStrictEqual(0);
    expect(Tuple({}).length).toStrictEqual(1);
    expect(Tuple({}, {}).length).toStrictEqual(2);
  });

  it('is frozen', () => {
    const tuple = Tuple();
    // @ts-ignore
    expect(() => void tuple.push(1)).toThrow();
  });

  it('throws on new operator', () => {
    // @ts-ignore
    expect(() => void new Tuple()).toThrow();
  });
});
