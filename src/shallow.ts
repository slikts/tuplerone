/**
 * This property existing on objects skips them when creating value objects or
 * deep symbols.
 */
export const isRef = Symbol('isRef');

interface Referable {
  [isRef]?: boolean;
}

declare global {
  // Allow setting the isRef property on any object
  interface Object extends Referable {}
}

/**
 * Marks the object to be skipped when creating value objects or deep symbols.
 *
 * @beta
 */
export const shallow = <A extends object>(target: A): A => {
  shallowCache.add(target);
  return target;
};

/**
 * Set of objects that should be returned by reference.
 */
export const shallowCache = new WeakSet<object>();
