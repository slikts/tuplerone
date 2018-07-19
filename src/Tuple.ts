import WeakishMap from './WeakishMap'
import { Tuple1, Tuple2, Tuple3, Tuple4, Tuple5, Tuple6, Tuple7 } from './tuplerone.d'
import {
  assignArraylike,
  arraylikeToIterable,
  getDefault,
  getDefaultLazy,
  isObject,
} from './helpers'

const arrayConstructor: {
  new (): any
} = <any>Array

const tupleKey = Object.create(null)
const symbolKey = Object.create(null)
const typeOf = (x: any): string => typeof x
const makeSymbol = (values: any[]): symbol => Symbol(String(values.map(typeOf)))
const cache = new WeakMap()
const confirmSymbol = Symbol()
const init = () => new WeakishMap()

const getLastNode = (values: any[]): WeakishMap<any, any> => {
  const rootValue = values.find(isObject)
  if (!rootValue) {
    throw TypeError('At least one value must be of type object')
  }
  const root = getDefaultLazy(rootValue, init, cache)
  return values.reduce((p, c) => getDefaultLazy(c, init, p), root)
}

export default class Tuple<A> extends arrayConstructor implements ArrayLike<A>, Iterable<A> {
  [i: number]: A
  length: number

  constructor(iterable: Iterable<A>, confirm: typeof confirmSymbol) {
    if (confirm !== confirmSymbol) {
      throw TypeError('The `Tuple.tuple()` method must be used to construct')
    }
    super()
    this.length = assignArraylike(iterable[Symbol.iterator](), this)
    Object.freeze(this)
  }

  static tuple<A, B, C, D, E, F, G>(values: [A, B, C, D, E, F, G]): Tuple7<A, B, C, D, E, F, G>
  static tuple<A, B, C, D, E, F>(values: [A, B, C, D, E, F]): Tuple6<A, B, C, D, E, F>
  static tuple<A, B, C, D, E>(values: [A, B, C, D, E]): Tuple5<A, B, C, D, E>
  static tuple<A, B, C, D>(values: [A, B, C, D]): Tuple4<A, B, C, D>
  static tuple<A, B, C>(values: [A, B, C]): Tuple3<A, B, C>
  static tuple<A, B>(values: [A, B]): Tuple2<A, B>
  static tuple<A>(values: [A]): Tuple1<A>
  static tuple(values: any[]): any {
    return getDefaultLazy(tupleKey, () => new Tuple(values, confirmSymbol), getLastNode(values))
  }

  static symbol(values: any[]): symbol {
    return getDefaultLazy(symbolKey, () => makeSymbol(values), getLastNode(values))
  }

  [Symbol.iterator](): IterableIterator<A> {
    return arraylikeToIterable(this)
  }
}

Object.getOwnPropertyNames(Array.prototype).forEach((key: any) => {
  if (key === 'constructor') {
    return
  }
  Tuple.prototype[key] = undefined
})

export const { tuple, symbol: tupleSymbol } = Tuple
