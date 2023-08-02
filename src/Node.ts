/**
 * Graph node used to look up interned values.
 */
export class Node extends Map<unknown, Node> {
  tuple?: WeakRef<readonly unknown[]>;
  symbol?: WeakRef<symbol>;
  object?: WeakRef<Readonly<object>>;
  fn?: WeakRef<Readonly<(...args: unknown[]) => unknown>>;

  /**
   * Automatically creates and connects the next node if it doesn't exist.
   */
  get(edge: unknown): Node {
    if (!this.has(edge)) {
      const value = new Node();
      this.set(edge, value);
      return value;
    }
    return super.get(edge) as Node;
  }
}
