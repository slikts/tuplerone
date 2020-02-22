import DeepCompositeSymbol from './DeepCompositeSymbol';

/**
 * Works somewhat similarly to Record in the Record & Tuple proposal:
 * https://github.com/tc39/proposal-record-tuple
 */
// tslint:disable-next-line: variable-name
const ValueObject = <A extends object>(object: A, keyFilter?: (key: string) => boolean): A => {
  const key = DeepCompositeSymbol(object, keyFilter);
  if (cache.has(key)) {
    return cache.get(key) as A;
  }
  cache.set(key, object);
  return object;
};

const cache = new Map<symbol, object>();

export default ValueObject;
