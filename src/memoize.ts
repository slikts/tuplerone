import { getLeaf } from './Tuple';
import { getDefaultLazy } from './helpers';

type Fn = (this: unknown, ...args: readonly unknown[]) => unknown;

const defaultCache = new WeakMap<object, unknown>();

export const memoize = <A extends Fn>(fn: A, cache = defaultCache): A => {
  const memoized: Fn = function (this: unknown, ...args: readonly unknown[]): unknown {
    const node = getLeaf([memoized, this, ...args]);
    return getDefaultLazy(node, () => fn.apply(this, args as unknown[]) as unknown, cache);
  };
  return memoized as unknown as A;
};
