import Tuple from '../src/Tuple';

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
