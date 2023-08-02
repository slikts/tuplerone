import { getSymbol } from './graph.ts';
import { isRef, cache as shallowCache } from './shallow.ts';

export const getDeepSymbol = (target: unknown): symbol => {
  const result = _get(target);
  if (typeof result !== 'symbol') {
    throw TypeError('Primitive values are not valid targets');
  }
  return result;
};

const _get = <A>(edge: A): A | symbol => {
  if (typeof edge === 'object' && edge !== null) {
    if (edge[isRef] || shallowCache.has(edge)) {
      return edge;
    }
    if (Array.isArray(edge)) {
      return getSymbol(edge.map(_get));
    }
    return getSymbol(
      Object.entries(edge as object)
        .flat()
        .map((value, i) => (i % 2 ? _get(value) : value)),
    );
  }
  return edge;
};
