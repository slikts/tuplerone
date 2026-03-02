---
"tuplerone": minor
---

Redesign `Tuple` as a proper class with static factory methods and overhaul the public API.

- `Tuple` is now a class; use `Tuple.tuple()` (exported as `Tuple`) to construct instances
- Add `CompositeSymbol` export (previously internal `symbol`)
- Add `UnsafeTuple` and `UnsafeCompositeSymbol` exports for advanced use cases where all-primitive keys are needed
- Add `DeepCompositeSymbol` — recursively creates a composite symbol (value identity) for an object's entries, with optional key filter
- Add new TypeScript types: `Tuple0`–`Tuple8`, `CompositeSymbol0`–`CompositeSymbol8`, `CompositeSymbolType`
- Modernize tuple types with variadic and `const` params for better type inference
- Add `WeakishMap` — a generic map wrapper that transparently uses `WeakMap` for non-primitive keys (including symbols) and `Map` for primitives
- Add `FinalizationRegistry` pruning in `Tuple` for automatic cleanup of ephemeral instances
