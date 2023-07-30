// import WeakishMap from './WeakishMap.ts';
// import { GenericMap, Indexable } from './types.js';

/**
 * Tests if a value is an object.
 *
 * Doesn't test for symbols because symbols are invalid as `WeakMap` keys.
 */
export const isObject = (x: any): x is object =>
  x !== null && (typeof x === 'object' || typeof x === 'function');

export const forEach = <A>(iterator: Iterator<A>, callback: (value: A) => void) => {
  do {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    callback(value);
    // eslint-disable-next-line no-constant-condition
  } while (true);
};

/**
 * Sets all items from an iterable as index properties on the target object.
 */
// export const assignArraylike = <A>(iterator: Iterator<A>, target: Indexable<A>): number => {
//   let i = 0;
//   forEach(iterator, (value: A) => {
//     target[i] = value;
//     i += 1;
//   });
//   return i;
// };

// export const arraylikeToIterable = <A>(source: ArrayLike<A>): IterableIterator<A> => {
//   let i = 0;
//   return {
//     next() {
//       let done;
//       let value;
//       if (i < source.length) {
//         done = false;
//         value = source[i];
//         i += 1;
//       } else {
//         done = true;
//         // Issue: https://github.com/Microsoft/TypeScript/issues/2983
//         value = <any>undefined;
//       }
//       return {
//         done,
//         value,
//       };
//     },

//     [Symbol.iterator]() {
//       return arraylikeToIterable(source);
//     },
//   };
// };
