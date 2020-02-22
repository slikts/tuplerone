import { GenericMap } from './types';
import { isObject } from './helpers';

/**
 * A generic wrapper to Map and WeakMap that can use both non-primitives
 * (objects and symbols) and primitives as keys, creating the underlying
 * storage as needed.
 */
export default class WeakishMap<A, B> implements GenericMap<A, B> {
  private weakMap?: WeakMap<object, B>;
  private map?: Map<A, B>;

  set(k: A, v: B): this {
    if (isObject(k)) {
      if (!this.weakMap) {
        this.weakMap = new WeakMap();
      }
      this.weakMap.set(k, v);
    } else {
      if (!this.map) {
        this.map = new Map();
      }
      this.map.set(k, v);
    }
    return this;
  }

  get(k: A): B | undefined {
    if (isObject(k) && this.weakMap) {
      return this.weakMap.get(k);
    }
    if (this.map) {
      return this.map.get(k);
    }
  }

  has(k: A): boolean {
    if (isObject(k) && this.weakMap) {
      return this.weakMap.has(k);
    }
    if (this.map) {
      return this.map.has(k);
    }
    return false;
  }
}
