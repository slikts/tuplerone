<h1 align="center"><a href="https://github.com/slikts/tuplerone"><img width="550" src="https://raw.githubusercontent.com/slikts/tuplerone/master/logo.svg?sanitize=true" alt="tuplerone"></a></h1>

<p align="center">
  <a href="https://img.shields.io/npm/v/tuplerone.svg?style=flat"><img src="https://img.shields.io/npm/v/tuplerone.svg?style=flat" alt="View this project on npm"></a>
</p>

<p align="center">A lightweight, efficient tuple and value object implementation for JavaScript and TypeScript.</p>

---

In JavaScript, objects with the same contents aren't equal:

```ts
[1, 2, 3] === [1, 2, 3]; // → false
```

Tuplerone fixes this. The same arguments always produce the same object reference, so `===` just works:

```ts twoslash
import { Tuple } from 'tuplerone';

const a = { id: 1 };
const b = { id: 2 };

Tuple(a, b) === Tuple(a, b); // → true

// Use as composite Map key
const map = new Map();
map.set(Tuple(a, b), 'pair');
map.get(Tuple(a, b)); // → 'pair'
```

Useful for memoization (e.g. React's [`memo()`][memo]), composite `Map` keys, and anywhere you need structural equality without deep comparison.

## Features

- **Tiny**—[under 1KB][bundlephobia] compressed, zero dependencies
- **Well-typed**—full TypeScript support (works from JavaScript too)
- **Well-tested**—full test coverage
- **Efficient**—[`WeakMap`][weakmap]-based directed acyclic graph for lookups
- **Immutable**—tuples are frozen with [`Object.freeze()`][frozen]
- **Iterable**—supports [`for-of`][for-of], spread, and destructuring

## Exports

| Export                  | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `Tuple`                 | Array-like value type with structural equality   |
| `CompositeSymbol`       | Create unique symbols from value sequences       |
| `DeepCompositeSymbol`   | Recursive composite key for nested objects       |
| `ValueObject`           | Frozen object with deep value semantics          |
| `memoize`               | Function memoization using the internal DAG      |
| `UnsafeTuple`           | Tuple variant that allows all-primitive values   |
| `UnsafeCompositeSymbol` | CompositeSymbol variant for all-primitive values |

## Installation

```
npm install tuplerone
```

## Documentation

**[Read the full documentation][docs]**

- [Getting Started][docs]
- [Tuple][docs-tuple]
- [CompositeSymbol][docs-composite-symbol]
- [ValueObject][docs-value-object]
- [Theory & Internals][docs-theory]
- [Caveats][docs-caveats]

## Related

- [TC39 Record & Tuple proposal][proposal]
- [TC39 Composite Keys proposal][composite]

[memo]: https://react.dev/reference/react/memo
[weakmap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[frozen]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[for-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
[bundlephobia]: https://bundlephobia.com/result?p=tuplerone
[proposal]: https://github.com/tc39/proposal-record-tuple
[composite]: https://github.com/bmeck/proposal-richer-keys/tree/master/compositeKey
[docs]: https://slikts.github.io/tuplerone/
[docs-tuple]: https://slikts.github.io/tuplerone/docs/usage/tuple
[docs-composite-symbol]: https://slikts.github.io/tuplerone/docs/usage/composite-symbol
[docs-value-object]: https://slikts.github.io/tuplerone/docs/usage/value-object
[docs-theory]: https://slikts.github.io/tuplerone/docs/theory
[docs-caveats]: https://slikts.github.io/tuplerone/docs/caveats
