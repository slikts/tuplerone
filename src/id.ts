import { Primitive } from './tuplerone.d'
import { getSet, isObject } from './helpers'

const cache: Map<Primitive, object> = new Map()

const create = () => Object.create(null)

export const objectId = (x: any): object => (isObject(x) ? x : getSet(x, create, cache))
