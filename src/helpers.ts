import { GenericMap, Indexable } from './types';

/**
 * Gets a map element, lazily initializing it with a default value.
 */
export const getDefaultLazy = <A, B>(key: A, init: () => B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    const value = init();
    target.set(key, value);
    return value;
  }
  return <B>target.get(key);
};

/**
 * Gets a map element, initializing it with a default value.
 */
export const getDefault = <A, B>(key: A, defaultValue: B, target: GenericMap<A, B>): B => {
  if (!target.has(key)) {
    target.set(key, defaultValue);
    return defaultValue;
  }
  return <B>target.get(key);
};

/**
 * Tests if a value has an identity.
 */
export const isNotPrimitive = (x: any): x is object =>
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
    next() {
      let done;
      let value;
      if (i < source.length) {
        done = false;
        value = source[i];
        i += 1;
      } else {
        done = true;
        // Issue: https://github.com/Microsoft/TypeScript/issues/2983
        value = <any>undefined;
      }
      return {
        done,
        value,
      };
    },

    [Symbol.iterator]() {
      return arraylikeToIterable(source);
    },
  };
};
