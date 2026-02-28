import WeakishMap from './WeakishMap';
import { Tuple0, TupleN, CompositeSymbol, CompositeSymbol0 } from './types';
import { assignArraylike, arraylikeToIterable, getDefaultLazy, isWeakMapKey } from './helpers';

export default class Tuple<A> extends (Array as any) implements ArrayLike<A>, Iterable<A> {
  [i: number]: A;
  declare length: number;

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
  /**
   * Constructs a tuple.
   */
  static tuple<const T extends readonly unknown[]>(...values: T): TupleN<T> {
    // Special case for 0-tuples
    if (values.length === 0) {
      // Only construct if needed
      if (tuple0 === undefined) {
        tuple0 = new Tuple([], localToken) as any;
      }
      return tuple0 as any;
    }
    return getDefaultLazy(
      tupleKey,
      () => new Tuple(values, localToken),
      getLeaf(values as any),
    ) as any;
  }
  static symbol<const T extends readonly unknown[]>(...values: T): CompositeSymbol<T> {
    return getDefaultLazy(symbolKey, () => Symbol(), getLeaf(values as any));
  }

  // The exported member is cast as the same type as Tuple.tuple() to avoid duplicating the overloads
  static unsafe(...values: any[]): any {
    return getDefaultLazy(
      tupleKey,
      () => new UnsafeTuple(values, localToken),
      getUnsafeLeaf(values),
    );
  }

  static unsafeSymbol(...values: any[]): any {
    return getDefaultLazy(symbolKey, Symbol, getUnsafeLeaf(values));
  }

  [Symbol.iterator](): IterableIterator<A> {
    return arraylikeToIterable(this);
  }
}

// Root cache keys for each tuple type
const tupleKey = Symbol();
const symbolKey = Symbol();

const cache = new WeakishMap();

// Token used to prevent calling the constructor from other modules
const localToken = Symbol();

const initWeakish = () => new WeakishMap();
let tuple0: Tuple0;

export const getLeaf = (values: any[], unsafe?: boolean): WeakishMap<any, any> => {
  const rootValue = values.find(isWeakMapKey);
  if (!rootValue && !unsafe) {
    // Throw since it's not possible to weak-reference primitives directly by other primitives
    throw TypeError('At least one value must be suitable as a WeakMap key (object or symbol)');
  }
  // If the first value is not an object/symbol, pad the values with the first object/symbol
  const root = rootValue === values[0] ? cache : getDefaultLazy(rootValue, initWeakish, cache);
  return values.reduce((prev, curr) => getDefaultLazy(curr, initWeakish, prev), root);
};

// Unsafe tuples aren't garbage collected so it's more efficient to just use a normal map
const unsafeCache = new Map();
const initUnsafe = () => new Map();
class UnsafeTuple<A> extends Tuple<A> {}
/**
 * A memory-leaky, slightly more efficient version of `getLeaf()`.
 */
export const getUnsafeLeaf = (values: any[]): Map<any, any> =>
  values.reduce((prev, curr) => getDefaultLazy(curr, initUnsafe, prev), unsafeCache);

export const { tuple, symbol, unsafe, unsafeSymbol } = Tuple;

// Expose constructor to be used for `instanceof`
tuple.constructor = Tuple;
unsafe.constructor = UnsafeTuple;
