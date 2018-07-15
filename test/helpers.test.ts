import { isObject } from '../src/helpers'

describe('helpers', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject('a')).toBe(false)
    expect(isObject(() => {})).toBe(true)
  })
})
