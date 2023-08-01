import { getNode, registry } from './graph.ts';

const TupleConstructor = class Tuple<A extends readonly unknown[]> extends Array {
  constructor(values: A) {
    super();
    this.push(...values);
    Object.freeze(this);
  }
};

export function Tuple<A extends unknown[]>(...path: A): Readonly<A> {
  if (new.target) {
    throw new TypeError('Tuple is not a constructor');
  }

  if (path.length === 0) {
    // Shortcut for 0-tuples
    return tuple0 as any;
  }

  const node = getNode(path);
  const derefed = node.tuple?.deref();
  if (derefed) {
    return derefed as A;
  }
  const tuple = new TupleConstructor<A>(path);
  node.tuple = new WeakRef(tuple);
  registry.register(tuple, path);

  return tuple as A;
}

// Allow `instanceof` checks with the helper function as if it were a constructor
Object.defineProperty(Tuple, Symbol.hasInstance, {
  value: (instance: unknown) => instance instanceof TupleConstructor,
  writable: false,
  configurable: false,
});

// 0-tuple singleton
const tuple0 = new TupleConstructor([]);
