import DeepCompositeSymbol from './DeepCompositeSymbol';
import { isObject } from './helpers';

/**
 * Works somewhat similarly to Record in the Record & Tuple proposal:
 * https://github.com/tc39/proposal-record-tuple
 */
// tslint:disable-next-line: variable-name
const ValueObject = <A extends any>(target: A, filter?: (entry: [string, any]) => boolean): A => {
  if (!isObject(target)) {
    return target;
  }
  const key = DeepCompositeSymbol(target, filter);
  if (cache.has(key)) {
    return cache.get(key) as A;
  }
  cache.set(key, target);
  return target;
};

const cache = new Map<symbol, object>();

export default ValueObject;
