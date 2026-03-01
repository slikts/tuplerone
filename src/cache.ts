import WeakishMap from './WeakishMap';
import { getDefaultLazy, isWeakMapKey } from './helpers';

// Root cache keys for each tuple type
export const tupleKey = Symbol();
export const symbolKey = Symbol();

const cache = new WeakishMap();

const initWeakish = () => new WeakishMap();

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

export const prune = (values: readonly any[]) => {
  const rootValue = values.find(isWeakMapKey);
  if (!rootValue) return;

  const stack: [WeakishMap<any, any>, any][] = [];
  let current: WeakishMap<any, any> | undefined = cache;

  if (rootValue !== values[0]) {
    stack.push([current, rootValue]);
    current = current.get(rootValue) as WeakishMap<any, any> | undefined;
    if (!current) return;
  }

  for (const val of values) {
    stack.push([current, val]);
    current = current.get(val) as WeakishMap<any, any> | undefined;
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
const unsafeCache = new Map();
const initUnsafe = () => new Map();

/**
 * A memory-leaky, slightly more efficient version of `getLeaf()`.
 */
export const getUnsafeLeaf = (values: any[]): Map<any, any> =>
  values.reduce((prev, curr) => getDefaultLazy(curr, initUnsafe, prev), unsafeCache);
