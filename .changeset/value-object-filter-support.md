---
"tuplerone": minor
---

Improve `ValueObject` with filter support and shallow/circular object handling.

- Add optional `filter` parameter `(entry: [string, any]) => boolean` applied recursively to object entries
- Skip shallow-marked or circular-reference objects (returning them as-is) to handle advanced memoization patterns
- Export `DeepReadonly<A>` utility type
