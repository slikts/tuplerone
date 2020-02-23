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

export const shallow = Symbol('shallow');

const update = (entry: [string, any], filter?: any) => {
  const value = entry[1];
  if (!value[shallow] && isObject(value) && !(value instanceof Tuple)) {
    entry[1] = DeepCompositeSymbol(value, filter);
  }
};

const flatten = (entries: any[][]) => Array.prototype.concat.apply([], entries);

export default DeepCompositeSymbol;
