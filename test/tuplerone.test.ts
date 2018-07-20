import { tuple, tupleSymbol } from '../src/tuplerone'

describe('tuple', () => {
  const a = Object('a')
  const b = Object('b')
  const c = Object('c')

  it('1-tuple objects compare', () => {
    expect(tuple(a)).toBe(tuple(a))
  })

  it('2-tuple objects compare', () => {
    expect(tuple(a, b)).toBe(tuple(a, b))
  })

  it('3-tuple objects compare', () => {
    expect(tuple(a, b, c)).toBe(tuple(a, b, c))
    expect(tuple(a, b, c)).not.toBe(tuple(a, b))
  })

  it('all-primitive tuples throw', () => {
    expect(() => tuple(1, 2, 3)).toThrow()
  })

  it('root object tuple compares', () => {
    expect(tuple(a, 1, 2)).toBe(tuple(a, 1, 2))
  })

  it('non-root object tuple compares', () => {
    expect(tuple(1, 2, a)).toBe(tuple(1, 2, a))
  })

  it('2-tuple different roots not compare', () => {
    expect(tuple(a, 1)).not.toBe(tuple(a, 2))
  })

  it('2-tuple different roots reverse not compare', () => {
    expect(tuple(1, a)).not.toBe(tuple(2, a))
  })

  it('3-tuple different roots not compare', () => {
    expect(tuple(a, 1, 2)).not.toBe(tuple(a, 2, 1))
  })

  it('overlapping not compare', () => {
    expect(tuple(a, 1, 2)).not.toBe(tuple(a, 1))
    expect(tuple(1, a, 2)).not.toBe(tuple(1, a))
  })
})

describe('tuple symbol', () => {
  it('is of type symbol', () => {
    expect(typeof tupleSymbol(1, 2, {})).toBe('symbol')
  })

  it('compares', () => {
    const a = {}
    expect(tupleSymbol(1, 2, a)).toBe(tupleSymbol(1, 2, a))
  })
})

describe('other', () => {
  it('0-tuple', () => {
    expect(tuple()).toBe(tuple())
    expect(tuple()).not.toBe(tuple({}))
  })
})
