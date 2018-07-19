import { GenericMap } from './tuplerone.d'

/** Get a map element, initializing it with a lazy default value. */
export const getDefaultLazy = <A, B>(key: A, init: () => B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    const value = init()
    target.set(key, value)
    return value
  }
  return <B>target.get(key)
}

/** Get a map element, initializing it with a default value. */
export const getDefault = <A, B>(key: A, defaultValue: B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    target.set(key, defaultValue)
    return defaultValue
  }
  return <B>target.get(key)
}

/** Test if a value is an object. */
export const isObject = (x: any): x is object =>
  x !== null && (typeof x === 'object' || typeof x === 'function')
