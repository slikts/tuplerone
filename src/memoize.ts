import { getLeaf } from './Tuple'
import { getDefaultLazy } from './helpers'

const cache = new WeakMap()

export function memoize<A extends Function>(this: any, fn: A): A {
  const memoized: any = (...args: any[]) => {
    const node = getLeaf([memoized, ...args])
    return getDefaultLazy(node, () => fn.apply(this, args), cache)
  }
  return memoized as A
}
