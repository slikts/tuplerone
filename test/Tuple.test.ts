import Tuple from '../src/Tuple'

describe('Tuple', () => {
  it('constructor throws', () => {
    expect(() => new Tuple([1, {}], null)).toThrow()
  })

  it('static method constructs', () => {
    expect(Tuple.tuple([1, {}])).toBeInstanceOf(Tuple)
  })
})
