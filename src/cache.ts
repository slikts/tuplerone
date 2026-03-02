import WeakishMap from './WeakishMap';
import { getDefaultLazy, isWeakMapKey } from './helpers';

// Root cache keys for each tuple type
export const tupleKey = Symbol();
export const symbolKey = Symbol();

// The cache is a recursive DAG: each node stores child nodes keyed by value.
// We use WeakishMap<unknown, unknown> to represent nodes at every level,
// casting to the recursive type where getDefaultLazy needs it.
type CacheNode = WeakishMap<unknown, unknown>;
const asNodeMap = (m: CacheNode) => m as unknown as WeakishMap<unknown, CacheNode>;

const cache: CacheNode = new WeakishMap<unknown, unknown>();

const initWeakish = (): CacheNode => new WeakishMap<unknown, unknown>();

export const getLeaf = (values: readonly unknown[], unsafe?: boolean): CacheNode => {
  const rootValue = values.find(isWeakMapKey);
  if (!rootValue && !unsafe) {
    // Throw since it's not possible to weak-reference primitives directly by other primitives
    throw TypeError('At least one value must be suitable as a WeakMap key (object or symbol)');
  }
  // If the first value is not an object/symbol, pad the values with the first object/symbol
  const root =
    rootValue === values[0] ? cache : getDefaultLazy(rootValue, initWeakish, asNodeMap(cache));
  return values.reduce<CacheNode>(
    (prev, curr) => getDefaultLazy(curr, initWeakish, asNodeMap(prev)),
    root,
  );
};

export const prune = (values: readonly unknown[]) => {
  const rootValue = values.find(isWeakMapKey);
  if (!rootValue) return;

  const stack: [CacheNode, unknown][] = [];
  let current: CacheNode | undefined = cache;

  if (rootValue !== values[0]) {
    stack.push([current, rootValue]);
    current = current.get(rootValue) as CacheNode | undefined;
    if (!current) return;
  }

  for (const val of values) {
    stack.push([current, val]);
    current = current.get(val) as CacheNode | undefined;
    if (!current) return;
  }

  let node = current;
  for (let i = stack.length - 1; i >= 0; i--) {
    const [parent, key] = stack[i];
    if (node.isEmpty()) {
      parent.delete(key);
      node = parent;
    } else {
      break;
    }
  }
};

export const registry = new FinalizationRegistry<readonly unknown[]>((path) => void prune(path));

// Unsafe tuples aren't garbage collected so it's more efficient to just use a normal map
type UnsafeCacheNode = Map<unknown, unknown>;
const asUnsafeNodeMap = (m: UnsafeCacheNode) => m as unknown as Map<unknown, UnsafeCacheNode>;

const unsafeCache: UnsafeCacheNode = new Map<unknown, unknown>();
const initUnsafe = (): UnsafeCacheNode => new Map<unknown, unknown>();

/**
 * A memory-leaky, slightly more efficient version of `getLeaf()`.
 */
export const getUnsafeLeaf = (values: readonly unknown[]): UnsafeCacheNode =>
  values.reduce<UnsafeCacheNode>(
    (prev, curr) => getDefaultLazy(curr, initUnsafe, asUnsafeNodeMap(prev)),
    unsafeCache,
  );
