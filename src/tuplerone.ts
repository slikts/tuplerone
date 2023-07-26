import { unsafe, tuple, unsafeSymbol } from './Tuple';
import DeepCompositeSymbol from './DeepCompositeSymbol';
import ValueObject from './ValueObject';

export { symbol as CompositeSymbol } from './Tuple';
export { memoize } from './memoize';

/**
 * A tuple whose members are allowed to all be primitive,
 * so it can't be garbage-collected and should only be used
 * in advanced contexts.
 */
export const UnsafeTuple = unsafe as typeof tuple;

export const UnsafeCompositeSymbol = unsafeSymbol as typeof tuple;

export { DeepCompositeSymbol, ValueObject, tuple as Tuple };

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
