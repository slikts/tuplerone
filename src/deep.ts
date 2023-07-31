import { getSymbol } from './graph.ts';

export const getDeepSymbol = (target: unknown): symbol => {
  const result = _get(target);
  if (typeof result !== 'symbol') {
    throw TypeError('Primitive values are not valid targets');
  }
  return result;
};

const _get = <A>(edge: A): A | symbol => {
  switch (typeof edge) {
    case 'string':
    case 'symbol':
    case 'number':
    case 'boolean':
    case 'bigint':
    case 'undefined':
    case 'function':
      return edge;
    default:
      if (Array.isArray(edge)) {
        return getSymbol(edge.map(_get));
      }
      return getSymbol(
        Object.entries(edge as object)
          .flat()
          .map((value, i) => (i % 2 ? _get(value) : value)),
      );
  }
};
