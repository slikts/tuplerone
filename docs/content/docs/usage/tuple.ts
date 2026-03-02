import { Tuple, Tuple2, TupleN } from 'tuplerone';

// Dummy objects
const a = Object('a');
const b = Object('b');
const c = Object('c');

// Structural equality testing using the identity operator
Tuple(a, b, c) === Tuple(a, b, c); // → true
Tuple(a, b) === Tuple(b, a); // → false

// Mapping using a pair of values as key
const map = new Map<Tuple2<{}, {}>, number>();
map.set(Tuple(a, b), 123).get(Tuple(a, b)); // → 123
