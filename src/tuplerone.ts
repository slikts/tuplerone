import { unsafe, tuple } from './Tuple';

export { symbol as SymbolTuple } from './Tuple';
export { memoize } from './memoize';

/**
 * A tuple whose members are allowed to all be primitive,
 * so it can't be garbage-collected and should only be used
 * in advanced contexts.
 */
// tslint:disable-next-line: variable-name
export const UnsafeTuple = unsafe as typeof tuple;

export { tuple as Tuple };

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
  SymbolTuple as SymbolTupleType,
  SymbolTuple0,
  SymbolTuple1,
  SymbolTuple2,
  SymbolTuple3,
  SymbolTuple4,
  SymbolTuple5,
  SymbolTuple6,
  SymbolTuple7,
  SymbolTuple8,
} from './types';
