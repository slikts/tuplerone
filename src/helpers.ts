import { GenericMap } from './tuplerone.d'

export const getSetInit = <A, B>(key: A, init: () => B, target: GenericMap<A, B>): B =>
  getSet(key, init(), target)

export const getSet = <A, B>(key: A, value: B, target: GenericMap<A, B>): B =>
  <B>(target.has(key) ? target : target.set(key, value)).get(key)

export const isObject = (x: any): x is object =>
  x !== null && (typeof x === 'object' || typeof x === 'function')
