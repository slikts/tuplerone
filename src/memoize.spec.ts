import { memoize } from './memoize';

describe('memoize()', () => {
  it('returns a function', () => {
    expect(memoize(() => {})).toBeInstanceOf(Function);
  });

  it('returns the same object', () => {
    const f = memoize((a: any) => ({ a }));
    const o = f(1);
    expect(f(1)).toBe(o);
    expect(f(1)).toBe(o);
    expect(f(2)).not.toBe(o);
  });

  it('names memoized function', () => {
    const named = () => {}
    expect(memoize(named).name).toBe('named')
  })

  it('supports multiple arguments', () => {
    const f = memoize((a: any, b: any, c: any) => ({ a, b, c }));
    const o = f(1, 2, 3);
    expect(f(1, 2, 3)).toBe(o);
    expect(f(1, 2, 3)).toBe(o);
    expect(f(2, 3, 4)).not.toBe(o);
  });

  it('supports setting receiver', () => {
    const f = memoize(function (this: any) {
      return this;
    });
    expect(f.call(123)).toBe(123);
  });

  it('receiver is memoized', () => {
    let n = 0;
    const f = memoize((x: any) => {
      n += x;
      return n;
    });
    const o = {};
    expect(f.call(o, 1)).toBe(1);
    expect(f.call(o, 1)).toBe(1);
    expect(f.call(o, 2)).toBe(3);
  });
});
