import { unsafe, tuple, unsafeSymbol, symbol } from './Tuple';
import DeepCompositeSymbol from './DeepCompositeSymbol';
import ValueObject from './ValueObject';

export {
  symbol as CompositeSymbol,
  unsafeSymbol as UnsafeCompositeSymbol,
  unsafe as UnsafeTuple,
} from './Tuple';
export { memoize } from './memoize';
export { shallowKey, shallow } from './DeepCompositeSymbol';

export { DeepCompositeSymbol, ValueObject, tuple as Tuple, tuple as default };

export {
  Tuple0,
  Tuple1,
  Tuple2,
  Tuple3,
  Tuple4,
  Tuple5,
  Tuple6,
  Tuple7,
  Tuple8,
  CompositeSymbol as CompositeSymbolType,
  CompositeSymbol0,
  CompositeSymbol1,
  CompositeSymbol2,
  CompositeSymbol3,
  CompositeSymbol4,
  CompositeSymbol5,
  CompositeSymbol6,
  CompositeSymbol7,
  CompositeSymbol8,
} from './types';
