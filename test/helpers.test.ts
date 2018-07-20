import { isObject, getDefault, getDefaultLazy } from '../src/helpers'

describe('helpers', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject('a')).toBe(false)
    expect(isObject(() => {})).toBe(true)
  })

  it('getDefault', () => {
    const m = new Map()
    expect(getDefault(1, 2, m)).toBe(2)
  })

  it('getDefault existing', () => {
    const m = new Map().set(1, 2)
    expect(getDefault(1, 3, m)).toBe(2)
  })

  it('getDefaultLazy', () => {
    const m = new Map()
    expect(getDefaultLazy(1, () => 2, m)).toBe(2)
  })
})
