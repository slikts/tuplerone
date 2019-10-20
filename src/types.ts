import Tuple from './Tuple';

export interface Settable<A, B> {
  set(key: A, value: B): this;
}

export interface Gettable<A, B> {
  get(key: A): B | undefined;
}

export interface GenericMap<A, B> extends GetSettable<A, B> {
  has(key: A): boolean;
}

export type GetSettable<A, B> = Settable<A, B> & Gettable<A, B>;

export type Primitive = boolean | undefined | null | number | string | symbol;

export interface Tuple0 extends Tuple<never> {
  readonly length: 0;
}
/** Singleton */
export interface Tuple1<A> extends Tuple<A> {
  readonly 0: A;
  readonly length: 1;
}
/** Pair */
export interface Tuple2<A, B> extends Tuple<A | B> {
  readonly 0: A;
  readonly 1: B;
  readonly length: 2;
}
/** Triple */
export interface Tuple3<A, B, C> extends Tuple<A | B | C> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly length: 3;
}
/** Quadruple */
export interface Tuple4<A, B, C, D> extends Tuple<A | B | C | D> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly 3: D;
  readonly length: 4;
}
/** Quintuple */
export interface Tuple5<A, B, C, D, E> extends Tuple<A | B | C | D | E> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly 3: D;
  readonly 4: E;
  readonly length: 5;
}
/** Sextuple */
export interface Tuple6<A, B, C, D, E, F> extends Tuple<A | B | C | D | E | F> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly 3: D;
  readonly 4: E;
  readonly 5: F;
  readonly length: 6;
}
/** Septuple */
export interface Tuple7<A, B, C, D, E, F, G> extends Tuple<A | B | C | D | E | F | G> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly 3: D;
  readonly 4: E;
  readonly 5: F;
  readonly 6: G;
  readonly length: 7;
}
/** Octuple */
export interface Tuple8<A, B, C, D, E, F, G, H> extends Tuple<A | B | C | D | E | F | G | H> {
  readonly 0: A;
  readonly 1: B;
  readonly 2: C;
  readonly 3: D;
  readonly 4: E;
  readonly 5: F;
  readonly 6: G;
  readonly 7: H;
  readonly length: 8;
}

export type CompositeSymbol<T> = {
  t: T;
} & symbol;
// tslint:disable-next-line: variable-name
export const CompositeSymbol0: CompositeSymbol<[never]> = Symbol('CompositeSymbol0') as any;
export type CompositeSymbol1<A> = CompositeSymbol<[A]>;
export type CompositeSymbol2<A, B> = CompositeSymbol<[A, B]>;
export type CompositeSymbol3<A, B, C> = CompositeSymbol<[A, B, C]>;
export type CompositeSymbol4<A, B, C, D> = CompositeSymbol<[A, B, C, D]>;
export type CompositeSymbol5<A, B, C, D, E> = CompositeSymbol<[A, B, C, D, E]>;
export type CompositeSymbol6<A, B, C, D, E, F> = CompositeSymbol<[A, B, C, D, E, F]>;
export type CompositeSymbol7<A, B, C, D, E, F, G> = CompositeSymbol<[A, B, C, D, E, F, G]>;
export type CompositeSymbol8<A, B, C, D, E, F, G, H> = CompositeSymbol<[A, B, C, D, E, F, G, H]>;

export interface Indexable<A> {
  [i: number]: A;
}
