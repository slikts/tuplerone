import { getTuple as Tuple } from './Tuple';

describe(`Tuple`, () => {
  const a = Object('a');
  const b = Object('b');
  const c = Object('c');

  it('constructs', () => {
    expect(Tuple(1, {})).toBeInstanceOf(Tuple);
    expect(Tuple.name).toBe('Tuple')
  });

  it('supports only primitive values', () => {
    expect(Tuple(1, 2)).toStrictEqual(Tuple(1, 2))
    expect(Tuple(1, 2)).not.toStrictEqual(Tuple(1, 2, 3))
  })

  it('supports 0-tuples', () => {
    expect(Tuple()).toStrictEqual(Tuple())
    expect(Tuple()).not.toStrictEqual(Tuple(1))
  })

  it('supports objects', () => {
    const o = {}
    expect(Tuple(o, 1, 2)).toStrictEqual(Tuple(o, 1, 2))
  })

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

  it('root object tuple compares', () => {
    expect(Tuple(a, 1, 2)).toStrictEqual(Tuple(a, 1, 2));
  });

  it('non-root object tuple compares', () => {
    expect(Tuple(1, 2, a)).toStrictEqual(Tuple(1, 2, a));
  });

  it('2-tuple different roots not compare', () => {
    expect(Tuple(a, 1)).not.toStrictEqual(Tuple(a, 2));
  });

  it('2-tuple different roots reverse not compare', () => {
    expect(Tuple(1, a)).not.toStrictEqual(Tuple(2, a));
  });

  it('3-tuple different roots not compare', () => {
    expect(Tuple(a, 1, 2)).not.toStrictEqual(Tuple(a, 2, 1));
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


  it('supports readme examples', () => {
    // expect(Tuple()).toStrictEqualInstanceOf(Tuple.constructor);
    // const tuple0: Tuple<[]> = Tuple(); // 0-tuple
    // const tuple1: typeof Tuple = Tuple(o); // 1-tuple
    // const tuple2: Tuple2<typeof o, number> = Tuple(o, 1); // 2-tuple
    // // @ts-ignore
    // Tuple(o) === Tuple(o, 1); // TS compile error due to different arities
  })

  it('can take spread params', () => {
    expect(Tuple(...([1, a] as const))).toEqual([1, a]);
  });
});
