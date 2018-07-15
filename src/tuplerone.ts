import WeakishMap from './WeakishMap'
import { getSet } from './helpers'

type Tuple<A> = ReadonlyArray<A>

const init = () => new WeakishMap()

const makeTuple = <A>(xs: A[]): ReadonlyArray<A> => Object.freeze(xs.slice())

const tupleKey = Object.create(null)

const cache = init()

export function tuple<A, B, C, D, E>(values: [A, B, C, D, E]): Tuple<[A, B, C, D, E]>
export function tuple<A, B, C, D>(values: [A, B, C, D]): Tuple<[A, B, C, D]>
export function tuple<A, B, C>(values: [A, B, C]): Tuple<[A, B, C]>
export function tuple<A, B>(values: [A, B]): Tuple<[A, B]>
export function tuple(values: any[]): Tuple<any[]> {
  const map = values.reduce((p, c) => getSet(c, init, p), cache)
  return getSet(tupleKey, () => makeTuple(values), map)
}
