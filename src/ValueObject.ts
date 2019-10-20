import DeepCompositeSymbol from './DeepCompositeSymbol';

// tslint:disable-next-line: variable-name
const ValueObject = ((object: any) => {
  if (objectCache.has(object)) {
    return keyCache.get(objectCache.get(object));
  }
  const key = DeepCompositeSymbol(object);
  if (keyCache.has(key)) {
    objectCache.set(object, key);
    return keyCache.get(key);
  }
  keyCache.set(key, object);
  return object;
}) as any;

const keyCache = new Map();
const objectCache = new WeakMap();

export default ValueObject;
