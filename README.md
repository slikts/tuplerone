# tuplerone

[![Travis](https://img.shields.io/travis/slikts/tuplerone.svg)](https://travis-ci.org/slikts/tuplerone)
[![Coveralls](https://img.shields.io/coveralls/slikts/tuplerone.svg)](https://coveralls.io/github/slikts/tuplerone)
[![Dev Dependencies](https://david-dm.org/slikts/tuplerone/dev-status.svg)](https://david-dm.org/slikts/tuplerone?type=dev)

![logo][logo]

A tuple data structure implementation in JavaScript based on [ES2015 `WeakMap`][WeakMap].

***

[Tuples] are finite ordered sequences of values, and languages commonly implement tuples to allow grouping heterogenous data types and to provide immutability. JavaScript arrays can already include any types, but the purpose of having tuples in JavaScript is to simplify equality testing for groups of values and to use groups of values as keys in maps ([`Map`][Map], [`WeakMap`][WeakMap]).

This library is:
* tiny (a couple of kilobytes minified), with no dependencies,
* well-typed using TypeScript,
* fully covered by tests.

The tuple objects are:
* [frozen] – tuple object properties cannot be added, removed or changed,
* [array-like] – tuple members can be accessed by indexing, and there's a `length` property, but no `Array` prototype methods,
* [iterable] – tuple members can be iterated over using [`for-of`][for-of] loops or spread syntax.

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
tuple(a, b, c) === tuple(a, b, c); // → true
tuple(a, b) === tuple(b, a); // → false

// Mapping a pair of values to a different value 
const map = new Map();
map.set(tuple(a, b), 123).get(tuple(a, b)); // → 123

// Nesting tuples
tuple(a, tuple(b, c)) === tuple(a, tuple(b, c)); // → true

// Using primitive values
tuple(1, "a", a); // → Tuple(3) [1, "a", Object("a")]

// Indexing
tuple(a, b)[1]; // → Object("b")

// Checking arity
tuple(a, b).length; // → 2

// Failing to mutate
tuple(a, b)[0] = c; // throws an error
```

## Advantages

Tuples simplify deep equality testing and can replace functions like [`isEqual()`][isEqual] in lodash or having to stringify data to JSON to make it comparable, which can be difficult due to recursive references. Tuples can be compared efficiently, in constant time with the `===` identity operator.

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

### Types

The library is well-typed using TypeScript:

```typescript
import { tuple, Tuple } from "tuplerone";

// Dummy object
const o = {};

tuple() instanceof Tuple; // → true
tuple() as Tuple0; // 0-tuple
tuple(o) as Tuple1<typeof o>; // 1-tuple
tuple(o, 1) as Tuple2<typeof o, number>; // 2-tuple
tuple(o) === tuple(a, 1) // TS compile error due to different arities
```

The tuples are currently typed up to 8-tuple (octuple).

In editors like VS Code, the type information is also available when the library is consumed as JavaScript.

## Caveats

Due to `WeakMap` being limited to using objects as keys, there must be at least one member of a tuple with the object type, or the tuples would leak memory. Trying to create tuples with only primitive members will throw an error.

```typescript
tuple(1, 2); // throws TypeError
tuple(1, 2, {}); // works
```

`WeakMap` is an ES2015 feature which is difficult to polyfill, so this library is best used in environments like node or browser extensions where legacy support may not be needed.

tuplerone tuples are not supported by the relation comparison operators like `<`, whereas in a language like Python the following (comparing tuples by arity) would evaluate to true: `(1,) < (1, 2)`.

### Array-likeness

Tuples subclass `Array`:

```typescript
Array.isArray(tuple()); // → true
```

Yet tuples don't share the `Array` prototype methods, since tuples are frozen in the constructor and this breaks most of the `Array` methods, which rely on mutation.

The advantage of extending `Array` is ergonomic console representation.


## License

MIT

## Author

slikts <dabas@untu.ms>

[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[logo]: https://i.imgur.com/hAUGWcW.png
[tuples]: https://en.wiktionary.org/wiki/tuple
[isEqual]: https://lodash.com/docs/4.17.10#isEqual
[frozen]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[composite]: https://github.com/bmeck/proposal-richer-keys/tree/master/compositeKey
[iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
[tuple]: https://en.wiktionary.org/wiki/tuple
[array-like]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects
[for-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
