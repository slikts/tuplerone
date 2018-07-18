# tuplerone

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/slikts/tuplerone.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/slikts/tuplerone.svg)](https://travis-ci.org/slikts/tuplerone)
[![Coveralls](https://img.shields.io/coveralls/slikts/tuplerone.svg)](https://coveralls.io/github/slikts/tuplerone)
[![Dev Dependencies](https://david-dm.org/slikts/tuplerone/dev-status.svg)](https://david-dm.org/slikts/tuplerone?type=dev)

Tuple implementation in JavaScript using `WeakMap`.

## Usage

```javascript

import { tuple } from "tuplerone";

const a = Object("a");
const b = Object("b");
const c = Object("c");

console.log(tuple([a, b, c]) === tuple([a, b, c])); // -> true

const map = new Map();

console.log(map.set(tuple([a, b, c]), 123).get(tuple([a, b, c]))); // -> 123
```
