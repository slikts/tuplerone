import Tuple from './Tuple';
import { isObject } from './helpers';

// tslint:disable-next-line: variable-name
const DeepCompositeSymbol: typeof Tuple.symbol = ((object: any) => {
  const entries = Object.entries(object);
  // Recursively replace non-tuple object values with
  entries.forEach(update);
  return Tuple.unsafeSymbol(...Array.prototype.concat.apply([], entries));
}) as any;

const update = (entry: any) => {
  const v = entry[1];
  if (isObject(v) && !(v instanceof Tuple)) {
    entry[1] = DeepCompositeSymbol(v);
  }
};

export default DeepCompositeSymbol;
