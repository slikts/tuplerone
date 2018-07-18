import { tuple, tupleSymbol } from '../src/tuplerone'

describe('tuple', () => {
  const a = { a: 1 }
  const b = { b: 2 }
  const c = { c: 3 }

  it('1-tuple objects compare', () => {
    expect(tuple([a])).toBe(tuple([a]))
  })

  it('2-tuple objects compare', () => {
    expect(tuple([a, b])).toBe(tuple([a, b]))
  })

  it('3-tuple objects compare', () => {
    expect(tuple([a, b, c])).toBe(tuple([a, b, c]))
    expect(Object.is(tuple([a, b, c]), tuple([a, b]))).toBe(false)
  })

  it('all-primitive tuples throw', () => {
    expect(() => tuple([1, 2, 3])).toThrow()
  })

  it('root object tuple compares', () => {
    expect(tuple([a, 1, 2])).toBe(tuple([a, 1, 2]))
  })

  it('non-root object tuple compares', () => {
    expect(tuple([1, 2, a])).toBe(tuple([1, 2, a]))
  })
})

describe('tuple symbol', () => {
  it('is of type symbol', () => {
    expect(typeof tupleSymbol([1, 2, {}])).toBe('symbol')
  })

  it('compares', () => {
    const a = {}
    expect(tupleSymbol([1, 2, a])).toBe(tupleSymbol([1, 2, a]))
  })
})
