import Tuple from './Tuple';
import { isWeakMapKey } from './helpers';
import { isRef, shallowCache } from './shallow';

/**
 * Recursively creates a "composite key" (like a "value identity") for
 * an object's entries (key-value pairs).
 */
const DeepCompositeSymbol = (object: object, filter?: (entry: [string, unknown]) => boolean) => {
  if (shallowCache.has(object) || object[isRef]) {
    return Tuple.unsafeSymbol(object);
  }

  const entries = filter ? Object.entries(object).filter(filter) : Object.entries(object);
  // Recursively replace non-tuple object values with tuples
  entries.forEach((entry) => update(entry, filter));
  return Tuple.unsafeSymbol(...entries.flat());
};

const update = (entry: [string, unknown], filter?: (entry: [string, unknown]) => boolean) => {
  const v = entry[1];
  if (isWeakMapKey(v) && typeof v !== 'symbol' && !(v instanceof Tuple)) {
    entry[1] = DeepCompositeSymbol(v as object, filter);
  }
};

export default DeepCompositeSymbol;
