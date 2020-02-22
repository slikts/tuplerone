import Tuple from './Tuple';
import { isObject } from './helpers';

// tslint:disable-next-line: variable-name
const DeepCompositeSymbol = ((object: any, keyFilter?: (key: string) => boolean) => {
  const entries = keyFilter
    ? Object.entries(object).filter(entry => keyFilter(entry[0]))
    : Object.entries(object);
  // Recursively replace non-tuple object values with tuples
  entries.forEach(update);
  return Tuple.unsafeSymbol(...flatten(entries));
}) as any;

const update = (entry: any) => {
  const v = entry[1];
  if (isObject(v) && !(v instanceof Tuple)) {
    entry[1] = DeepCompositeSymbol(v);
  }
};

const flatten = (entries: any[][]) => Array.prototype.concat.apply([], entries);

export default DeepCompositeSymbol;
