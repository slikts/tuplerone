import { getLeaf } from './Tuple';
import { getDefaultLazy } from './helpers';

const defaultCache = new WeakMap();

export const memoize = <A extends Function>(fn: A, cache = defaultCache): A => {
  const memoized: any = function(this: any, ...args: any[]) {
    const node = getLeaf([memoized, this, ...args]);
    return getDefaultLazy(node, () => fn.apply(this, args), defaultCache);
  };
  return memoized as A;
};
