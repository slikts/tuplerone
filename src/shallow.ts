export const isRef = Symbol('isRef');

interface Referable {
  [isRef]?: boolean;
}

declare global {
  interface Object extends Referable {}
}

export const shallow = <A extends object>(target: A): A => {
  cache.add(target)
  return target
}

export const cache = new WeakSet<object>()
