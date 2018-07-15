import { tuple } from '../src/tuplerone'

describe('tuple', () => {
  const a = { a: 1 }
  const b = { b: 2 }
  const c = { c: 3 }

  it('2-tuple objects', () => {
    expect(tuple([a, b])).toBe(tuple([a, b]))
  })

  it('3-tuple objects', () => {
    expect(tuple([a, b, c])).toBe(tuple([a, b, c]))
    expect(Object.is(tuple([a, b, c]), tuple([a, b]))).toBe(false)
  })

  it('3-tuple primitives', () => {
    expect(tuple([1, 2, 3])).toBe(tuple([1, 2, 3]))
    expect(Object.is(tuple([1, 2]), tuple([1, 2, 3]))).toBe(false)
  })
})
