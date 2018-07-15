import { GenericMap, GetSettable } from './tuplerone.d'

// export const setDefault = <A, B, C extends GenericMap<A, B>>(key: A, value: B, target: C): C =>
//   target.has(key) ? target : target.set(key, value)

export const getSet = <A, B>(key: A, init: () => B, target: GetSettable<A, B>): B =>
  target.get(key) || <B>target.set(key, init()).get(key)

export const isObject = (x: any): x is object =>
  x !== null && (typeof x === 'object' || typeof x === 'function')
