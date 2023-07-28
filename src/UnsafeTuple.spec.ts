import { UnsafeTuple } from './tuplerone';

describe(UnsafeTuple.name, () => {
  it('constructs', () => {
    expect(UnsafeTuple(1, 2)).toBeInstanceOf(UnsafeTuple.constructor);
  });

  it('iterates', () => {
    expect([...UnsafeTuple(1, 2)]).toEqual([1, 2]);
  });
});
