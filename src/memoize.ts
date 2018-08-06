import { getLeaf } from './Tuple'
import { getDefaultLazy } from './helpers'

const cache = new WeakMap()

export const memoize = <A extends Function>(fn: A): A => {
  const memoized: any = function(this: any, ...args: any[]) {
    const node = getLeaf([memoized, ...args])
    return getDefaultLazy(node, () => fn.apply(this, args), cache)
  }
  return memoized as A
}
