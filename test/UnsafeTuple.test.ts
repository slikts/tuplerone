import { unsafe as UnsafeTuple } from '../src/Tuple';

describe('UnsafeTuple', () => {
  it('constructs', () => {
    expect(UnsafeTuple(1, 2)).toBeInstanceOf(UnsafeTuple.constructor);
  });

  it('iterates', () => {
    expect([...UnsafeTuple(1, 2)]).toEqual([1, 2]);
  });
});
