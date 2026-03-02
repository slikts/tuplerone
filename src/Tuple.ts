import { Tuple0, TupleN, CompositeSymbol } from './types';
import { assignArraylike } from './helpers';
import { tupleKey, symbolKey, getLeaf, getUnsafeLeaf, registry } from './cache';

export default class Tuple<A> extends Array<A> implements ArrayLike<A>, Iterable<A> {
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
  static tuple<const T extends readonly unknown[]>(...values: T): TupleN<T> {
    // Special case for 0-tuples
    if (values.length === 0) {
      // Only construct if needed
      if (tuple0 === undefined) {
        tuple0 = new Tuple([], localToken) as unknown as Tuple0;
      }
      return tuple0 as unknown as TupleN<T>;
    }
    const leaf = getLeaf(values as readonly unknown[]);
    const ref = leaf.get(tupleKey) as WeakRef<TupleN<T>> | undefined;
    let tuple = ref && ref.deref();
    if (!tuple) {
      tuple = new Tuple(values, localToken) as unknown as TupleN<T>;
      leaf.set(tupleKey, new WeakRef(tuple));
      registry.register(tuple, values as readonly unknown[]);
    }
    return tuple;
  }

  static symbol<const T extends readonly unknown[]>(...values: T): CompositeSymbol<T> {
    const leaf = getLeaf(values as readonly unknown[]);
    const ref = leaf.get(symbolKey) as WeakRef<CompositeSymbol<T>> | undefined;
    let sym = ref && ref.deref();
    if (!sym) {
      sym = Symbol() as CompositeSymbol<T>;
      leaf.set(symbolKey, new WeakRef(sym));
      registry.register(sym, values as readonly unknown[]);
    }
    return sym;
  }

  // The exported member is cast as the same type as Tuple.tuple() to avoid duplicating the overloads
  static unsafe(...values: unknown[]): unknown {
    const leaf = getUnsafeLeaf(values);
    if (!leaf.has(tupleKey)) {
      leaf.set(tupleKey, new UnsafeTuple(values, localToken));
    }
    return leaf.get(tupleKey);
  }

  static unsafeSymbol(...values: unknown[]): unknown {
    const leaf = getUnsafeLeaf(values);
    if (!leaf.has(symbolKey)) {
      leaf.set(symbolKey, Symbol());
    }
    return leaf.get(symbolKey);
  }
}

// Token used to prevent calling the constructor from other modules
const localToken = Symbol();

let tuple0: Tuple0;

class UnsafeTuple<A> extends Tuple<A> {}

export { getLeaf, getUnsafeLeaf, registry, prune } from './cache';

export const { tuple, symbol, unsafe, unsafeSymbol } = Tuple;

// Expose constructor to be used for `instanceof`
tuple.constructor = Tuple;
unsafe.constructor = UnsafeTuple;
