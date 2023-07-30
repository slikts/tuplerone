import { getNode, registry } from './graph'

class Tuple<A extends unknown[] = []> extends Array {
  constructor(...values: A) {
    super();

    this.push(...values)

    Object.freeze(this);
  }
}

export const getTuple = <A extends unknown[] = []>(...path: A): Tuple<A> => {
  if (path.length === 0) {
    // Shortcut for 0-tuples
    return tuple0 as any;
  }

  const node = getNode(path)
  const derefed = node.tuple?.deref()
  if (derefed) {
    return derefed as Tuple<A>
  }
  const tuple = new Tuple<A>(...path)
  node.tuple = new WeakRef(tuple)
  registry.register(tuple, path)

  return tuple
}

// Allow `instanceof` checks with the helper function as if it were a constructor
Object.defineProperties(getTuple, {
  [Symbol.hasInstance]: {
    value: (instance: any) => instance instanceof Tuple,
    writable: false,
    configurable: false
  },
  name: {
    value: 'Tuple',
    writable: false,
    enumerable: false,
    configurable: true
  }
})


// 0-tuple singleton
const tuple0 = new Tuple();
