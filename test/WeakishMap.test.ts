import WeakishMap from '../src/WeakishMap'

describe('WeakishMap', () => {
  it('is instantiable', () => {
    expect(new WeakishMap()).toBeInstanceOf(WeakishMap)
  })

  it('can set/get primitives', () => {
    expect(new WeakishMap().set('a', 1).get('a')).toBe(1)
  })

  it('can set/get objects', () => {
    const o = {}
    expect(new WeakishMap().set(o, 1).get(o)).toBe(1)
  })

  it('test primitive membership', () => {
    expect(new WeakishMap().set('a', 1).has('a')).toBe(true)
  })

  it('test object membership', () => {
    const o = {}
    expect(new WeakishMap().set(o, 1).has(o)).toBe(true)
  })
})
