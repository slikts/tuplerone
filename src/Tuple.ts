import WeakishMap from './WeakishMap';
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
  SymbolTuple,
  SymbolTuple0,
  SymbolTuple1,
  SymbolTuple2,
  SymbolTuple3,
  SymbolTuple4,
  SymbolTuple5,
  SymbolTuple6,
  SymbolTuple7,
  SymbolTuple8,
} from './types';
import { assignArraylike, arraylikeToIterable, getDefaultLazy, isObject } from './helpers';

export default class Tuple<A> extends (Array as any) implements ArrayLike<A>, Iterable<A> {
  [i: number]: A;
  length: number = 0;

  /**
   * @throws {TypeError} Will throw if called non-locally; use the tuple() method instead.
   */
  constructor(iterable: Iterable<A>, confirm: typeof localToken) {
    super();
    // TODO: make configurable or remove? it currently breaks subclassing
    if (confirm !== localToken) {
      throw TypeError('The `Tuple.tuple()` method must be used to construct');
    }
    assignArraylike(iterable[Symbol.iterator](), this);
    Object.freeze(this);
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
  ): Tuple8<A, B, C, D, E, F, G, H>;
  static tuple<A, B, C, D, E, F, G>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
  ): Tuple7<A, B, C, D, E, F, G>;
  static tuple<A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): Tuple6<A, B, C, D, E, F>;
  static tuple<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E>;
  static tuple<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D>;
  static tuple<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C>;
  static tuple<A, B>(a: A, b: B): Tuple2<A, B>;
  static tuple<A>(a: A): Tuple1<A>;
  static tuple(): Tuple0;
  static tuple(...values: any[]): any {
    // Special case for 0-tuples
    if (values.length === 0) {
      // Only construct if needed
      if (tuple0 === undefined) {
        tuple0 = new Tuple([], localToken) as any;
      }
      return tuple0;
    }
    return getDefaultLazy(tupleKey, () => new Tuple(values, localToken), getLeaf(values));
  }
  static symbol<A, B, C, D, E, F, G, H>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
  ): SymbolTuple8<A, B, C, D, E, F, G, H>;
  static symbol<A, B, C, D, E, F, G>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
  ): SymbolTuple7<A, B, C, D, E, F, G>;
  static symbol<A, B, C, D, E, F>(
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
  ): SymbolTuple6<A, B, C, D, E, F>;
  static symbol<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): SymbolTuple5<A, B, C, D, E>;
  static symbol<A, B, C, D>(a: A, b: B, c: C, d: D): SymbolTuple4<A, B, C, D>;
  static symbol<A, B, C>(a: A, b: B, c: C): SymbolTuple3<A, B, C>;
  static symbol<A, B>(a: A, b: B): SymbolTuple2<A, B>;
  static symbol<A>(a: A): SymbolTuple1<A>;
  static symbol(): typeof SymbolTuple0;
  static symbol(...values: any[]): any {
    return getDefaultLazy(symbolKey, () => Symbol(), getLeaf(values));
  }

  // The exported member is cast as the same type as Tuple.tuple() to avoid duplicating the overloads
  static unsafe(...values: any[]): any {
    return getDefaultLazy(
      tupleKey,
      () => new UnsafeTuple(values, localToken),
      getUnsafeLeaf(values),
    );
  }

  [Symbol.iterator](): IterableIterator<A> {
    return arraylikeToIterable(this);
  }
}

// Cache keys for each tuple type
const tupleKey = Symbol();
const symbolKey = Symbol();

const cache = new WeakishMap();

// Token used to prevent calling the constructor from other modules
const localToken = Symbol();

const initWeakish = () => new WeakishMap();
let tuple0: Tuple0;

/**
 * Tries to use the first object from value list as the root key and throws
 * if there's no objects.
 */
export const getLeaf = (values: any[]): WeakishMap<any, any> => {
  const rootValue = values.find(isObject);
  if (!rootValue) {
    // Throw since it's not possible to weak-reference objects by primitives, only by other objects
    throw TypeError('At least one value must be of type object');
  }
  // If the first value is not an object, pad the values with the first object
  const root = rootValue === values[0] ? cache : getDefaultLazy(rootValue, initWeakish, cache);
  return values.reduce((p, c) => getDefaultLazy(c, initWeakish, p), root);
};

// Unsafe tuples aren't garbage collected so it's more efficient to just use a normal map
const unsafeCache = new Map();
const initUnsafe = () => new Map();
class UnsafeTuple<A> extends Tuple<A> {}
export const getUnsafeLeaf = (values: any[]): Map<any, any> =>
  values.reduce((p, c) => getDefaultLazy(c, initUnsafe, p), unsafeCache);

export const { tuple, symbol, unsafe } = Tuple;

// Expose constructor to be used for `instanceof`
tuple.constructor = Tuple;
unsafe.constructor = UnsafeTuple;
