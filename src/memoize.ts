import { getLeaf } from './Tuple';
import { getDefaultLazy } from './helpers';

const cache = new WeakMap();

// eslint-disable-next-line @typescript-eslint/ban-types
export const memoize = <A extends Function>(fn: A): A => {
  const memoized: any = function (this: any, ...args: any[]) {
    const node = getLeaf([memoized, this, ...args]);
    return getDefaultLazy(node, () => fn.apply(this, args), cache);
  };
  return memoized as A;
};
