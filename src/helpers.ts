import type { GenericMap, Indexable } from './types';

/**
 * Gets a map element, lazily initializing it with a default value.
 */
export const getDefaultLazy = <A, B>(key: A, init: () => B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    const value = init();
    target.set(key, value);
    return value;
  }
  return target.get(key)!;
};

/**
 * Gets a map element, initializing it with a default value.
 */
export const getDefault = <A, B>(key: A, defaultValue: B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    target.set(key, defaultValue);
    return defaultValue;
  }
  return target.get(key)!;
};

/**
 * Tests if a value is an object or symbol, suitable for use as a WeakMap key.
 */
export const isWeakMapKey = (x: unknown): x is object | symbol =>
  x !== null && (typeof x === 'object' || typeof x === 'function' || typeof x === 'symbol');

export const forEach = <A>(iterator: Iterator<A>, callback: (value: A) => void) => {
  do {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    callback(value);
  } while (true);
};

/**
 * Sets all items from an iterable as index properties on the target object.
 */
export const assignArraylike = <A>(iterator: Iterator<A>, target: Indexable<A>): number => {
  let i = 0;
  forEach(iterator, (value: A) => {
    target[i] = value;
    i += 1;
  });
  return i;
};

export const arraylikeToIterable = <A>(source: ArrayLike<A>): IterableIterator<A> => {
  let i = 0;
  return {
    next(): IteratorResult<A> {
      if (i < source.length) {
        const value = source[i];
        i += 1;
        return { done: false, value };
      }
      return { done: true, value: undefined };
    },

    [Symbol.iterator]() {
      return arraylikeToIterable(source);
    },
  };
};
