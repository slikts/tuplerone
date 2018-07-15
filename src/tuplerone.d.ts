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

export type All = Primitive | object
