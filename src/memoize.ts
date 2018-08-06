import { getLastNode } from './Tuple'
import { getDefaultLazy } from './helpers'

const cache = new WeakMap()

export const memoize = <A extends Function>(fn: A): A => {
  const memoized: any = (...args: any[]) => {
    const node = getLastNode([memoized, ...args])
    return getDefaultLazy(node, () => fn(...args), cache)
  }
  return memoized as A
}
