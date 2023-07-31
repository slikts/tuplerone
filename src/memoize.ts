import { getNode } from './graph';

const cache = new WeakMap();

export const memoize = <A extends (...args: unknown[]) => unknown>(fn: A): A => {
  const memoized = function (this: unknown, ...args: unknown[]) {
    const node = getNode([memoized, this, ...args]);
    if (!cache.has(node)) {
      cache.set(node, fn.apply(this, args));
    }
    return cache.get(node);
  };

  if (fn.name) {
    Object.defineProperty(memoized, 'name', { value: fn.name, writable: false });
  }
  return memoized as A;
};
