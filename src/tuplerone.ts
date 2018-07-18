import WeakishMap from './WeakishMap'
import { getSetInit, getSet, isObject } from './helpers'
import { Tuple, Tuple2, Tuple3, Tuple4, Tuple5, Tuple6, Tuple7 } from './tuplerone.d'

const init = () => new WeakishMap()
const makeTuple = (values: any[]): ReadonlyArray<any> => Object.freeze(values.slice())
const typeOf = (x: any): string => typeof x
const makeSymbol = (values: any[]): symbol => Symbol(String(values.map(typeOf)))
const objectKey = Object.create(null)
const symbolKey = Object.create(null)
const cache = new WeakMap()

const getLastNode = (values: any[]): WeakishMap<any, any> => {
  const rootValue = values.find(isObject)
  if (!rootValue) {
    throw TypeError('At least one value must be of type object')
  }
  const root = getSetInit(rootValue, init, cache)
  return values.reduce((p, c) => getSetInit(c, init, p), root)
}

export function tuple<A, B, C, D, E, F, G>(
  values: [A, B, C, D, E, F, G]
): Tuple7<A, B, C, D, E, F, G>
export function tuple<A, B, C, D, E, F>(values: [A, B, C, D, E, F]): Tuple6<A, B, C, D, E, F>
export function tuple<A, B, C, D, E>(values: [A, B, C, D, E]): Tuple5<A, B, C, D, E>
export function tuple<A, B, C, D>(values: [A, B, C, D]): Tuple4<A, B, C, D>
export function tuple<A, B, C>(values: [A, B, C]): Tuple3<A, B, C>
export function tuple<A, B>(values: [A, B]): Tuple2<A, B>
export function tuple<A>(values: [A]): Tuple<A>
export function tuple(values: any[]): Tuple<any> {
  return getSet(objectKey, makeTuple(values), getLastNode(values))
}

export const tupleSymbol = (values: any[]): symbol =>
  getSet(symbolKey, makeSymbol(values), getLastNode(values))
