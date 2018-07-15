import { objectId } from '../src/id'

describe('id', () => {
  it('objectId', () => {
    expect(objectId('a')).toBe(objectId('a'))
    expect(objectId(Object)).toBe(objectId(Object))
  })
  it('objectId mappable', () => {
    const m = new WeakMap()
    m.set(objectId(123), 123)
    expect(m.get(objectId(123))).toEqual(123)
  })
})
