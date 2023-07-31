import { Node } from './Node.ts';

describe('Node', () => {
  it('constructs', () => {
    expect(new Node()).toBeInstanceOf(Node);
  });

  it('inits value', () => {
    const node = new Node();

    expect(node.get(123)).toBeInstanceOf(Node);
    expect(node.get(123)).not.toBe(node);
    expect(node.get(123)).toBe(node.get(123));
  });
});
