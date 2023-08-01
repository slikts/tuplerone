export class Node extends Map<unknown, Node> {
  tuple?: WeakRef<readonly unknown[]>;
  symbol?: WeakRef<symbol>;
  object?: WeakRef<Readonly<object>>;

  get(edge: unknown): Node {
    if (!this.has(edge)) {
      const value = new Node();
      this.set(edge, value);
      return value;
    }
    return super.get(edge) as Node;
  }
}
