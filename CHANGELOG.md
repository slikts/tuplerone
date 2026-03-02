# Tuplerone

## 4.0.0-next.5

### Minor Changes

- b7d37e4: Redesign `Tuple` as a proper class with static factory methods and overhaul the public API.
  - `Tuple` is now a class; use `Tuple.tuple()` (exported as `Tuple`) to construct instances
  - Add `CompositeSymbol` export (previously internal `symbol`)
  - Add `UnsafeTuple` and `UnsafeCompositeSymbol` exports for advanced use cases where all-primitive keys are needed
  - Add `DeepCompositeSymbol` — recursively creates a composite symbol (value identity) for an object's entries, with optional key filter
  - Add new TypeScript types: `Tuple0`–`Tuple8`, `CompositeSymbol0`–`CompositeSymbol8`, `CompositeSymbolType`
  - Modernize tuple types with variadic and `const` params for better type inference
  - Add `WeakishMap` — a generic map wrapper that transparently uses `WeakMap` for non-primitive keys (including symbols) and `Map` for primitives
  - Add `FinalizationRegistry` pruning in `Tuple` for automatic cleanup of ephemeral instances

- b7d37e4: Improve `ValueObject` with filter support and shallow/circular object handling.
  - Add optional `filter` parameter `(entry: [string, any]) => boolean` applied recursively to object entries
  - Skip shallow-marked or circular-reference objects (returning them as-is) to handle advanced memoization patterns
  - Export `DeepReadonly<A>` utility type

### Patch Changes

- b7d37e4: Fix `memoize` to correctly use the supplied `cache` parameter, and expose `cache` as a public API option.
