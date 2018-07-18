export interface Settable<A, B> {
  set(key: A, value: B): this
}

export interface Gettable<A, B> {
  get(key: A): B | undefined
}

export interface GenericMap<A, B> extends GetSettable<A, B> {
  has(key: A): boolean
}

export type GetSettable<A, B> = Settable<A, B> & Gettable<A, B>

export type Primitive = boolean | undefined | null | number | string | symbol

export type Tuple<A> = ReadonlyArray<A>

export interface Tuple2<A, B> extends Tuple<A | B> {
  0: A
  1: B
  length: 2
}
export interface Tuple3<A, B, C> extends Tuple<A | B | C> {
  0: A
  1: B
  2: C
  length: 3
}
export interface Tuple4<A, B, C, D> extends Tuple<A | B | C | D> {
  0: A
  1: B
  2: C
  3: D
  length: 4
}
export interface Tuple5<A, B, C, D, E> extends Tuple<A | B | C | D | E> {
  0: A
  1: B
  2: C
  3: D
  4: E
  length: 5
}
export interface Tuple6<A, B, C, D, E, F> extends Tuple<A | B | C | D | E | F> {
  0: A
  1: B
  2: C
  3: D
  4: E
  5: F
  length: 6
}
export interface Tuple7<A, B, C, D, E, F, G> extends Tuple<A | B | C | D | E | F | G> {
  0: A
  1: B
  2: C
  3: D
  4: E
  5: F
  6: G
  length: 7
}
