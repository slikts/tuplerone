import Tuple from './Tuple';
import { isObject } from './helpers';

/**
 * Recursively creates a "composite key" (like a "value identity") for
 * an object's entries (key-value pairs).
 */
// tslint:disable-next-line: variable-name
const DeepCompositeSymbol = (object: any, filter?: (entry: [string, any]) => boolean) => {
  const entries = filter ? Object.entries(object).filter(filter) : Object.entries(object);
  // Recursively replace non-tuple object values with tuples
  entries.forEach(entry => update(entry, filter));
  return Tuple.unsafeSymbol(...flatten(entries));
};

export const shallowKey = Symbol('shallow');
export const shallowCache = new WeakSet<object>();
export const shallow = <A extends object>(a: A): A => {
  shallowCache.add(a);
  return a;
};

const update = (entry: [string, any], filter?: any) => {
  const value = entry[1];
  if (
    isObject(value) &&
    !(value as any)[shallowKey] &&
    !(value instanceof Tuple) &&
    !shallowCache.has(value)
  ) {
    entry[1] = DeepCompositeSymbol(value, filter);
  }
};

const flatten = (entries: any[][]) => Array.prototype.concat.apply([], entries);

export default DeepCompositeSymbol;
