import { getNode, registry } from './graph.ts';

export function ValueObject<A extends object>(obj: A): DeepReadonly<A> {
  if (new.target) {
    throw new TypeError('ValueObject is not a constructor');
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      return [key, ValueObject(value)];
    }
    return [key, value];
  });
  const path = entries.flat();
  const node = getNode(path);
  const object = node.object?.deref();
  if (!object) {
    const object = Object.freeze(Object.fromEntries(entries)) as DeepReadonly<A>;
    node.object = new WeakRef(object);
    registry.register(object, path);
    return object;
  }
  return object as DeepReadonly<A>;
}

type DeepReadonly<A> = {
  readonly [P in keyof A]: A[P] extends object ? DeepReadonly<A[P]> : A[P];
};
