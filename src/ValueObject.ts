import DeepCompositeSymbol from './DeepCompositeSymbol';
import { isRef, shallowCache } from './shallow';

export type DeepReadonly<A> = {
  readonly [P in keyof A]: A[P] extends object ? DeepReadonly<A[P]> : A[P];
};

/**
 * Works somewhat similarly to Record in the Record & Tuple proposal:
 * https://github.com/tc39/proposal-record-tuple
 */
export function ValueObject<A extends object>(
  object: A,
  filter?: (entry: [string, any]) => boolean,
): DeepReadonly<A> {
  if (new.target) {
    throw new TypeError('ValueObject is not a constructor');
  }

  if (shallowCache.has(object) || (object as any)[isRef]) {
    return object as any;
  }

  const key = DeepCompositeSymbol(object, filter);
  if (cache.has(key)) {
    return cache.get(key) as DeepReadonly<A>;
  }

  const entries = filter ? Object.entries(object).filter(filter) : Object.entries(object);
  const mapped = entries.map(([k, v]) => {
    if (typeof v === 'object' && v !== null) {
      return [k, ValueObject(v, filter)];
    }
    return [k, v];
  });

  const frozen = Object.freeze(Object.fromEntries(mapped)) as DeepReadonly<A>;
  cache.set(key, frozen);
  return frozen;
}

const cache = new Map<symbol, object>();

export default ValueObject;
