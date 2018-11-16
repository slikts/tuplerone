import Tuple from '../src/Tuple'

describe('Tuple', () => {
  const a = Object('a')
  it('constructor throws', () => {
    expect(() => new (Tuple as any)([1, {}], null)).toThrow()
  })

  it('static method constructs', () => {
    expect(Tuple.tuple(1, {})).toBeInstanceOf(Tuple)
  })

  it('iterates', () => {
    expect([...Tuple.tuple(1, a)[Symbol.iterator]()]).toEqual([1, a])
    expect([...Tuple.tuple(1, a)]).toEqual([1, a])
  })
})
