import { getNode, prune, getSymbol, clear } from './graph';
import { Node } from './Node';

describe('graph', () => {
  afterEach(() => {
    clear();
  });

  it('gets node from path', () => {
    const node = getNode([1, 2, 3]);

    expect(node).toBeInstanceOf(Node);
    expect(getNode([1, 2, 3])).toStrictEqual(node);
    expect(getNode([1, 2]).size).toBe(1);
    expect(getNode([1, 2, 4])).toBeInstanceOf(Node);
    expect(getNode([1, 2]).size).toBe(2);
  });

  it('prunes unused paths', () => {
    getNode([1, 2, 3, 4]);
    getNode([1, 5]);
    prune([1, 2, 3, 4]);
    expect(getNode([1]).size).toBe(1);
  });

  it('skips pruning used paths', () => {
    getNode([1, 2, 3, 4]);
    prune([1, 2, 3]);
    expect(getNode([1, 2, 3]).size).toBe(1);
  });

  it('gets unique symbol for path', () => {
    expect(getSymbol([1, 2, 3])).toStrictEqual(getSymbol([1, 2, 3]));
  });
});
