import { memoize } from '../src/memoize'

describe('memoize', () => {
  it('returns a function', () => {
    expect(memoize(() => {})).toBeInstanceOf(Function)
  })

  it('returns the same object', () => {
    const f = memoize(a => ({}))
    const o = f(1)
    expect(f(1)).toBe(o)
    expect(f(1)).toBe(o)
    expect(f(2)).not.toBe(o)
  })

  it('supports multiple arguments', () => {
    const f = memoize((a, b, c) => ({}))
    console.log(f.name)
    const o = f(1, 2, 3)
    expect(f(1, 2, 3)).toBe(o)
    expect(f(1, 2, 3)).toBe(o)
    expect(f(2, 3, 4)).not.toBe(o)
  })
})
