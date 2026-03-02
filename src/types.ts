import Tuple from './Tuple';

export interface GenericMap<A, B> {
  get(key: A): B | undefined;
  set(key: A, value: B): this;
  has(key: A): boolean;
}

export type Primitive = boolean | undefined | null | number | string | symbol;

export type TupleN<T extends readonly unknown[]> = Tuple<T[number]> & Readonly<T>;

export interface Tuple0 extends Tuple<never> {
  readonly length: 0;
}
/** Singleton */
export type Tuple1<A> = TupleN<[A]>;
/** Pair */
export type Tuple2<A, B> = TupleN<[A, B]>;
/** Triple */
export type Tuple3<A, B, C> = TupleN<[A, B, C]>;
/** Quadruple */
export type Tuple4<A, B, C, D> = TupleN<[A, B, C, D]>;
/** Quintuple */
export type Tuple5<A, B, C, D, E> = TupleN<[A, B, C, D, E]>;
/** Sextuple */
export type Tuple6<A, B, C, D, E, F> = TupleN<[A, B, C, D, E, F]>;
/** Septuple */
export type Tuple7<A, B, C, D, E, F, G> = TupleN<[A, B, C, D, E, F, G]>;
/** Octuple */
export type Tuple8<A, B, C, D, E, F, G, H> = TupleN<[A, B, C, D, E, F, G, H]>;

export type CompositeSymbol<T extends readonly unknown[]> = {
  t: T;
} & symbol;
export const CompositeSymbol0: CompositeSymbol<readonly []> = Symbol(
  'CompositeSymbol0',
) as unknown as CompositeSymbol<readonly []>;
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
