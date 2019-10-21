import DeepCompositeSymbol from './DeepCompositeSymbol';

// tslint:disable-next-line: variable-name
const ValueObject = <A extends object>(object: A): A => {
  if (objectCache.has(object)) {
    return keyCache.get(objectCache.get(object)) as A;
  }
  const key = DeepCompositeSymbol(object);
  if (keyCache.has(key)) {
    Object.freeze(object);
    objectCache.set(object, key);
    return keyCache.get(key) as A;
  }
  keyCache.set(key, object);
  return object;
};

const keyCache = new Map<symbol, object>();
const objectCache = new WeakMap<object, any>();

export default ValueObject;
