import Tuple from './Tuple';
import { isWeakMapKey } from './helpers';

/**
 * Recursively creates a "composite key" (like a "value identity") for
 * an object's entries (key-value pairs).
 */
// tslint:disable-next-line: variable-name
const DeepCompositeSymbol = (object: any, filter?: (entry: [string, any]) => boolean) => {
  const entries = filter ? Object.entries(object).filter(filter) : Object.entries(object);
  // Recursively replace non-tuple object values with tuples
  entries.forEach((entry) => update(entry, filter));
  return Tuple.unsafeSymbol(...flatten(entries));
};

const update = (entry: any, filter?: any) => {
  const v = entry[1];
  if (isWeakMapKey(v) && !(v instanceof Tuple)) {
    entry[1] = DeepCompositeSymbol(v, filter);
  }
};

const flatten = (entries: any[][]) => Array.prototype.concat.apply([], entries);

export default DeepCompositeSymbol;
