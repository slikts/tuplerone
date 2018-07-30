import WeakishMap from './WeakishMap'
import {
  Tuple0,
  Tuple1,
  Tuple2,
  Tuple3,
  Tuple4,
  Tuple5,
  Tuple6,
  Tuple7,
  Tuple8,
  TupleSymbol,
  TupleSymbol2,
  TupleSymbol3,
  TupleSymbol4,
  TupleSymbol5,
  TupleSymbol6,
  TupleSymbol7,
  TupleSymbol8,
} from './types'
import {
  assignArraylike,
  arraylikeToIterable,
  getDefault,
  getDefaultLazy,
  isObject,
} from './helpers'
import { blockParams } from 'handlebars'

const arrayConstructor: {
  new (): any
} = <any>Array

const tupleKey = Object.create(null)
const symbolKey = Object.create(null)
const typeOf = (x: any): string => typeof x
const makeSymbol = (values: any[]): symbol => Symbol(String(values.map(typeOf)))
const cache = new WeakMap()
const localToken = Symbol()
const initWeakish = () => new WeakishMap()
let tuple0: Tuple0

const getLastNode = (values: any[]): WeakishMap<any, any> => {
  const rootValue = values.find(isObject)
  if (!rootValue) {
    throw TypeError('At least one value must be of type object')
  }
  const root = rootValue === values[0] ? cache : getDefaultLazy(rootValue, initWeakish, cache)
  return values.reduce((p, c) => getDefaultLazy(c, initWeakish, p), root)
}

export default class Tuple<A> extends arrayConstructor implements ArrayLike<A>, Iterable<A> {
  [i: number]: A
  length: number = 0

  /**
   * @throws {TypeError} Will throw if called non-locally; use the tuple() method instead.
   */
  constructor(iterable: Iterable<A>, confirm: typeof localToken) {
    super()
    if (confirm !== localToken) {
      throw TypeError('The `Tuple.tuple()` method must be used to construct')
    }
    assignArraylike(iterable[Symbol.iterator](), this)
    Object.freeze(this)
  }

  /**
   * Constructs a tuple.
   */
  static tuple<A, B, C, D, E, F, G, H>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
  ): Tuple8<A, B, C, D, E, F, G, H>
  static tuple<A, B, C, D, E, F, G>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
  ): Tuple7<A, B, C, D, E, F, G>
  static tuple<A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): Tuple6<A, B, C, D, E, F>
  static tuple<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E>
  static tuple<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D>
  static tuple<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C>
  static tuple<A, B>(a: A, b: B): Tuple2<A, B>
  static tuple<A>(a: A): Tuple1<A>
  static tuple(): Tuple0
  static tuple(...values: any[]): any {
    if (values.length === 0) {
      if (tuple0 === undefined) {
        tuple0 = new Tuple([], localToken) as any
      }
      return tuple0
    }
    return getDefaultLazy(tupleKey, () => new Tuple(values, localToken), getLastNode(values))
  }

  static symbol(...values: any[]): symbol {
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
  // Blank all the array methods since most of them don't work on a frozen array
  Tuple.prototype[key] = undefined
})

export const { tuple, symbol: tupleSymbol } = Tuple
