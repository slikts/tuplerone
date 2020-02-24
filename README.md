<h1 align="center"><a href="https://github.com/slikts/tuplerone"><img width="550" src="https://raw.githubusercontent.com/slikts/tuplerone/master/logo.svg?sanitize=true" alt="tuplerone"></a></h1>

<p align="center">
  <a href="https://www.npmjs.com/package/tuplerone"><img src="https://img.shields.io/npm/v/tuplerone.svg?style=flat" alt="View this project on npm"></a>
  <a href="https://travis-ci.org/slikts/tuplerone"><img src="https://img.shields.io/travis/slikts/tuplerone.svg" alt="Travis"></a>
  <a href="https://coveralls.io/github/slikts/tuplerone"><img src="https://img.shields.io/coveralls/slikts/tuplerone.svg" alt="Coveralls"></a>
  <a href="https://david-dm.org/slikts/tuplerone?type=dev"><img src="https://david-dm.org/slikts/tuplerone/dev-status.svg" alt="Dev Dependencies"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"></a>
  <img src="https://badgen.net/dependabot/slikts/tuplerone" alt="Dependabot">
</p>

<p align="center">A lightweight, efficient tuple and value object implementation for JavaScript and TypeScript.</p>

---

A quick reminder about what tuples are (using Python):

```python
(1, 2, 3) == (1, 2, 3) # → True
```

A JavaScript version of something similar looks like this:

```js
'[1,2,3]' === '[1,2,3]'; // → true
```

Except it's using a string and would need to be unserialized with `JSON.parse()` to allow accessing the separate members. Moreover, JSON is limited in what values can be serialized.

You could alternatively use `"1,2,3"` and `String.split(",")`, but it's also not very convenient. Just using an array doesn't work:

```js
[1, 2, 3] === [1, 2, 3]; // → false
```

Each JavaScript array is a different object and so its value is the reference to that object. Tuples are a way to make that reference the same if the array members are the same. Using Tuplerone:

```js
Tuple(1, 2, 3) === Tuple(1, 2, 3);
```

Example use case for tuples is dealing with memoization like React's [`memo()`][memo] or `PureComponent`, since you can pass lists as props to components without forcing re-renders or manually caching the list. It's also useful for using multiple values as keys with `Map()`. In general, it's just a nice thing to have in your toolbox.

**[Try Tuplerone in a sandbox][sandbox]**

---

This library is:

- _tiny_ (bundle size is [under one kilobyte][tiny] compressed), with no dependencies
- _well-typed_ using TypeScript (but can still be used from JavaScript, of course)
- _well-tested_ with full coverage
- _efficient_ using an ES2015 [`WeakMap`][weakmap]-based directed acyclic graph for lookups

The `Tuple` objects are:

- _immutable_ – properties cannot be added, removed or changed, and it's enforced with [`Object.freeze()`][frozen]
- [array-like] – tuple members can be accessed by indexing, and there's a `length` property, but no `Array` prototype methods
- [iterable] – tuple members can be iterated over, for example, using [`for-of`][for-of] loops or spread syntax

There exists a [stage-1 proposal][proposal] for adding a tuple type to JavaScript and a [different stage-1 proposal][composite] for adding a more limited value-semantic type.

## Theory

[Tuples] are **finite ordered sequences of values** that serve two main purposes in programming languages:

- grouping together heterogenous (mixed) data types within a static type system (this doesn't apply to a dynamically typed language like JavaScript)
- simplifying value-semantic comparisons of lists, which is what this library is mainly about

### Value semantics

A simple way to explain value semantics is to look at the difference between primitive values (like numbers and strings) and object values in JavaScript. Primitives are value-semantic by default,
meaning that the default comparison methods (`==`, `===` and `Object.is()`) compare primitive values by their contents, so, for example, any string is equal to any other string created with the same contents:

```js
'abc' === 'abc'; // → true, because both string literals create a value with the same contents
```

The contents of primitive values are also immutable (can't change at runtime), so the results of comparing primitive value equality can't be invalidated by the contents of the values changing.

Meanwhile, each object value (instance) in JavaScript has a unique identity, so each instance is only equal to itself and not any other instances:

```js
[1, 2, 3] === [1, 2, 3]; // → false, because both array literals create separate array instances
```

Objects by default can't be thought of as their contents since the contents can change, and this is called reference semantics, since objects essentially represent a place in memory. The downside is that it makes reasoning about a program harder, since the programmer has to consider potential changes.

A more direct practical consequence of reference semantics is that comparing instances requires _deep comparisons_, such as [`_.isEqual()`][isequal] in lodash or serializing the object values to JSON:

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

### npm

```
npm install tuplerone
```

### yarn

```
yarn add tuplerone
```

### CDN

https://unpkg.com/tuplerone/dist/tuplerone.umd.js

## Usage

### `Tuple(…values)`

```js
import { Tuple } from 'tuplerone';

// Dummy objects
const a = Object('a');
const b = Object('b');
const c = Object('c');

// Structural equality testing using the identity operator
Tuple(a, b, c) === Tuple(a, b, c); // → true
Tuple(a, b) === Tuple(b, a); // → false

// Mapping using a pair of values as key
const map = new Map();
map.set(Tuple(a, b), 123).get(Tuple(a, b)); // → 123

// Nesting tuples
Tuple(a, Tuple(b, c)) === Tuple(a, Tuple(b, c)); // → true

// Using primitive values
Tuple(1, 'a', a); // → Tuple(3) [1, "a", Object("a")]

// Indexing
Tuple(a, b)[1]; // → Object("b")

// Checking arity
Tuple(a, b).length; // → 2

// Failing to mutate
Tuple(a, b)[0] = c; // throws an error
```

The tuple function caches or memoizes its arguments to produce the same tuple object for the same arguments.

### Types

The library is well-typed using TypeScript:

```ts
import { Tuple, Tuple0, Tuple1, Tuple2 } from 'tuplerone';

// Dummy object for use as key
const o = {};

const tuple0: Tuple0 = Tuple(); // 0-tuple
const tuple1: Tuple1<typeof o> = Tuple(o); // 1-tuple
const tuple2: Tuple2<typeof o, number> = Tuple(o, 1); // 2-tuple

Tuple(o) === Tuple(o, 1); // TS compile error due to different arities

// Spreading a TypeScript tuple:
Tuple(...([1, 2, 3] as const)); // → Tuple3<1, 2, 3>
```

In editors like VS Code, the type information is also available when the library is consumed as JavaScript.

### `CompositeSymbol(…values)`

It's possible to avoid creating an `Array`-like tuple for cases where iterating the tuple members isn't needed (for example, just to use it as a key):

```js
import { CompositeSymbol } from 'tuplerone';

typeof CompositeSymbol(1, 2, {}) === 'symbol'; // → true
```

A symbol is more space efficient than a tuple and can be used as a key for plain objects.

### `ValueObject(object)`

Tuplerone also includes a simple [value object] implementation:

```js
import { ValueObject } from 'tuplerone';

ValueObject({ a: 1, { b: { c: 2 } }}) === ValueObject({ a: 1, { b: { c: 2 } }}); // → true
```

Note that the passed objects are frozen with [`Object.freeze()`][frozen].

## Caveats

Since this is a userspace implementation, there are a number of limitations.

### At least one member must be an object to avoid memory leaks

Due to `WeakMap` being limited to using objects as keys, there must be at least one member of a tuple with the object type, or the tuples would leak memory. Trying to create tuples with only primitive members will throw an error.

```ts
Tuple(1, 2); // throws TypeError
Tuple(1, 2, {}); // works
```

`WeakMap` is an ES2015 feature which is difficult to polyfill (the [polyfills][polyfill] don't support frozen objects), but this applies less to environments like node or browser extensions.

#### `UnsafeTuple`

There is an `UnsafeTuple` type for advanced use cases where the values not being garbage-collectable is acceptable, so it doesn't require having an object member:

```js
import { UnsafeTuple as Tuple } from 'tuplerone';

Tuple(1, 2, 3) === Tuple(1, 2, 3); // → true
```

### Can't be compared with operators like `<` or `>`

tuplerone tuples are not supported by the relation comparison operators like `<`, whereas in a language like Python the following (comparing tuples by arity) would evaluate to true: `(1,) < (1, 2)`.

### `Array`-like but there's no `Array` prototypes methods

Tuples subclass `Array`:

```typescript
Array.isArray(Tuple()); // → true
```

Yet tuples don't support mutative `Array` prototype methods like `Array.sort()`, since tuples are frozen.

The advantage of subclassing `Array` is ergonomic console representation (it's represented as an array would be), which is based on `Array.isArray()` and so requires subclassing `Array`.

### Limited number of arities

The tuples are currently typed up to 8-tuple (octuple) because TypeScript doesn't yet support [variadic generics]. The types are implemented using function overloads.

### `instanceof` doesn't work as expected

Tuples can be constructed without the `new` keyword to make them behave like other primitive values
(`Symbol`, `Boolean`, `String`, `Number`) that also don't require `new` and also are value-semantic. This means that `instanceof` doesn't work the same as for other objects, but can still be used like so:

```js
Tuple() instanceof Tuple.constructor; // → true
```

## License

MIT

## Author

slikts <dabas@untu.ms>

[weakmap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[tuples]: https://en.wiktionary.org/wiki/tuple
[isequal]: https://lodash.com/docs/4.17.10#isEqual
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
[isequal]: https://lodash.com/docs/#isEqual
[proposal]: https://github.com/tc39/proposal-record-tuple
[memo]: https://reactjs.org/docs/react-api.html#reactmemo
[variadic generics]: https://github.com/microsoft/TypeScript/issues/5453
[sandbox]: https://codesandbox.io/s/tuplerone-dm90w?expanddevtools=1
[value object]: https://en.wikipedia.org/wiki/Value_object
