import { GenericMap, All } from './tuplerone.d'
import { objectId } from './id'

export default class WeakishMap<A, B> implements GenericMap<A, B> {
  private readonly weakMap: WeakMap<object, B>

  constructor() {
    this.weakMap = new WeakMap()
  }

  set(k: A, v: B): this {
    this.weakMap.set(objectId(k), v)
    return this
  }

  get(k: A): B | undefined {
    return this.weakMap.get(objectId(k))
  }

  has(k: A): boolean {
    return this.weakMap.has(objectId(k))
  }
}
