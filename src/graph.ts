// import { Tuple } from './Tuple'
import { Node } from './Node.ts';

const root = new Node();

export const registry = new FinalizationRegistry((path: unknown[]) => void prune(path));

export const getNode = (path: unknown[]): Node =>
  path.reduce((node: Node, edge) => node.get(edge), root);

export const getSymbol = (path: unknown[]): symbol => {
  const node = getNode(path);
  const symbol = node.symbol?.deref();

  if (!symbol) {
    const symbol = Symbol();
    node.symbol = new WeakRef(symbol);
    registry.register(symbol, path);

    return symbol;
  }
  return symbol;
};

export const prune = (path: unknown[]): void => {
  let last: [Node, unknown] = [root, null];
  const nodes = [last];
  for (const edge of path) {
    last = [last[0].get(edge), edge];
    nodes.push(last);
  }
  for (let i = nodes.length - 1; i > 0; i--) {
    const [node, edge] = nodes[i];
    const [parent] = nodes[i - 1];
    if (node.size || node.tuple?.deref() || node.symbol?.deref()) {
      break;
    }
    parent.delete(edge);
  }
};

export const clear = () => {
  root.clear();
};
