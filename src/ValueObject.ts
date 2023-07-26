import DeepCompositeSymbol from './DeepCompositeSymbol';

/**
 * Works somewhat similarly to Record in the Record & Tuple proposal:
 * https://github.com/tc39/proposal-record-tuple
 */
const ValueObject = <A extends object>(
  object: A,
  filter?: (entry: [string, any]) => boolean,
): A => {
  const key = DeepCompositeSymbol(object, filter);
  if (cache.has(key)) {
    return cache.get(key) as A;
  }
  cache.set(key, object);
  return object;
};

const cache = new Map<symbol, object>();

export default ValueObject;
