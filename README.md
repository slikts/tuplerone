# tuplerone

[![Travis](https://img.shields.io/travis/slikts/tuplerone.svg)](https://travis-ci.org/slikts/tuplerone)
[![Coveralls](https://img.shields.io/coveralls/slikts/tuplerone.svg)](https://coveralls.io/github/slikts/tuplerone)
[![Dev Dependencies](https://david-dm.org/slikts/tuplerone/dev-status.svg)](https://david-dm.org/slikts/tuplerone?type=dev)

![logo][logo]

A tuple data structure implementation in JavaScript based on [ES2015 `WeakMap`][WeakMap].

[Tuples] are finite ordered sequences of values, and languages commonly implement tuples to allow grouping miscellaneous data types and to provide immutability. JavaScript arrays can already include any types, but the purpose of having tuples in JavaScript is simplifying equality testing for groups of values and using groups of values as keys in maps ([`Map`][Map], [`WeakMap`][WeakMap]).

This library is:

* lightweight with no dependencies,
* well-typed using TypeScript,
* fully covered by tests.

The tuples are implemented as [frozen][freeze], array-like iterables, or as symbols.

There exists a [stage-1 proposal][composite] for adding a similar feature to tuples to the base language.

## Installation

```
npm install --save tuplerone
```

## Usage

```javascript
import { tuple } from "tuplerone";

// Dummy objects
const a = Object("a");
const b = Object("b");
const c = Object("c");

// Simple equality testing using the identity operator
tuple(a, b, c) === tuple(a, b, c); // -> true
tuple(a, b) === tuple(b, a); // -> false

// Mapping a pair of values to a different value 
const map = new Map();
map.set(tuple(a, b), 123).get(tuple(a, b)); // -> 123

// Nesting tuples
tuple(a, tuple(b, c)) === tuple(a, tuple(b, c)); // -> true

// Using primitive values
tuple(1, "a", a); // -> Tuple(3) [1, "a", Object("a")]

// Indexing
tuple(a, b)[1]; // -> Object("b")

// Failing to mutate
tuple(a, b)[0] = c; // throws an error
```

## Advantages

Tuples simplify deep equality testing and can replace functions like [`isEqual()`][isEqual] in lodash or having to stringify data to JSON to make it comparable, which can be difficult due to recursive references. Tuples can be compared efficiently with the `===` identity operator.

This library uses a tree of [`WeakMap`][WeakMap] (for objects) or [`Map`][Map] (for primitives) maps. The average time complexity of the access operations of JavaScript maps is O(1), so the access speed isn't reduced with the number of tuples created.

Using `WeakMap` for objects ensures that tuples and their members can be garbage collected once they become unreachable. For example:

```javascript
let o = {};
// Create a new tuple that weakly references the object
tuple(o);
// Makes the object unreachable and thus also the tuple garbage collectable
a = null;
```

The tuple function can be thought of as memoizing the arguments to produce the same tuple object on each call.

## Caveats

Due to `WeakMap` being limited to using objects as keys, there must be at least one member of a tuple with the object type, or the tuples would leak memory. Trying to create tuples with only primitive members will throw an error.

`WeakMap` is an ES2015 feature which is difficult to polyfill, so this library is best used in environments like node or browser extensions.

## License

MIT

## Author

slikts <dabas@untu.ms>

[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[logo]: https://i.imgur.com/hAUGWcW.png
[tuples]: https://en.wiktionary.org/wiki/tuple
[isEqual]: https://lodash.com/docs/4.17.10#isEqual
[freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[composite]: https://github.com/bmeck/proposal-richer-keys/tree/master/compositeKey
