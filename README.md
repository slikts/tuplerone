<h1 align="center"><a href="https://github.com/slikts/tuplerone"><img width="550" src="https://raw.githubusercontent.com/slikts/tuplerone/master/logo.svg?sanitize=true" alt="tuplerone"></a></h1>

[![Travis](https://img.shields.io/travis/slikts/tuplerone.svg)](https://travis-ci.org/slikts/tuplerone)
[![Coveralls](https://img.shields.io/coveralls/slikts/tuplerone.svg)](https://coveralls.io/github/slikts/tuplerone)
[![Dev Dependencies](https://david-dm.org/slikts/tuplerone/dev-status.svg)](https://david-dm.org/slikts/tuplerone?type=dev)

A lightweight, efficient tuple data structure implementation for JavaScript.

***

This library is:
* tiny (bundle size is [under one kilobyte][tiny]), with no dependencies,
* well-typed using TypeScript, but can still be used from JavaScript,
* fully covered by tests.

The tuple objects are:
* [frozen] – tuple object properties cannot be added, removed or changed,
* [array-like] – tuple members can be accessed by indexing, and there's a `length` property, but no `Array` prototype methods,
* [iterable] – tuple members can be iterated over, for example, using [`for-of`][for-of] loops or spread syntax.

There exists a [stage-1 proposal][composite] for adding a similar feature to tuples to the base language.

## About

[Tuples] are **finite ordered sequences of values** that serve two main purposes in programming languages:
* grouping together heterogenous (mixed) data types within a static type system (this doesn't apply to a dynamically typed language like JavaScript),
* simplifying value-semantic comparisons of lists, which is what this library is mainly about.

### Value semantics

A simple way to explain value semantics is to look at the difference between primitive values (like numbers and strings) and object values in JavaScript. Primitives are value-semantic by default, 
meaning that the default comparison methods (`==`, `===` and `Object.is()`) compare primitive values by their contents, so, for example, any string is equal to any other string created with the same contents:

```js
"abc" === "abc"; // → true, because both string literals create a value with the same contents
```

The contents of primitive values are also immutable (can't change at runtime), so the results of comparing primitive value equality can't be invalidated by the contents of the values changing.

Meanwhile, each object value (instance) in JavaScript has a unique identity, so each instance is only equal to itself and not any other instances:
```js
[1, 2, 3] === [1, 2, 3]; // → false, because both array literals create separate array instances
```

Objects by default can't be thought of as their contents since the contents can change, and this is called reference semantics, since objects essentially represent a place in memory. The downside is that it makes reasoning about a program harder, since the programmer has to consider potential changes.

A more direct practical consequence of reference semantics is that comparing instances requires *deep comparisons*, such as [`_.isEqual()`][isEqual] in lodash or serializing the object values to JSON:
```js
let a = [1, 2, 3];
let b = [1, 2, 3];
let result = JSON.stringify(a) === JSON.stringify(b); // → true, because it's a deep comparison
a.push(4); // a and b contents are now different, so the cached comparison result is invalid
```
Deep comparison results can't be reliably cached since the compared instances can change, and it's also less efficient than just being able to use `===` directly. An another thing that's not possible with reference semantics is combining different values to use as a composite key (such as with `Map` or `WeakMap`).

### Directed acyclic graphs

Directed acyclic graphs (DAGs) are a data structure that allows efficiently mapping a sequence of values to a unique object containing them, which is how this library is implemented. Specifically, it uses a `WeakMap` object (optionally a `Map` as well if mapping primitives) for each node, and the nodes are re-used for overlapping paths in the graph. Map access has constant time complexity, so the number of tuples created doesn't slow down access speed. Using `WeakMap` ensures that if the values used to create the tuple are dereferenced, the tuple object gets garbage collected.

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

In essence, the tuple function can be thought of as memoizing the arguments to produce the same tuple object on each call.

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

`WeakMap` is an ES2015 feature which is difficult to polyfill (the [polyfills][polyfill] don't support frozen objects), but this applies less to environments like node or browser extensions.

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
[tuples]: https://en.wiktionary.org/wiki/tuple
[isEqual]: https://lodash.com/docs/4.17.10#isEqual
[frozen]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[composite]: https://github.com/bmeck/proposal-richer-keys/tree/master/compositeKey
[iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
[tuple]: https://en.wiktionary.org/wiki/tuple
[array-like]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects
[for-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
[tiny]: https://bundlephobia.com/result?p=tuplerone
[polyfill]: https://github.com/medikoo/es6-weak-map#readme
[value semantics]: https://en.wikipedia.org/wiki/Value_semantics
[value types]: https://en.wikipedia.org/wiki/Value_type_and_reference_type
[isEqual]: https://lodash.com/docs/#isEqual
