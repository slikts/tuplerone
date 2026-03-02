import { Tuple, Tuple0, Tuple1, Tuple2 } from '../src/tuplerone';
import { describe, it, expect } from 'vitest';
// Dummy object
const o = {};
describe('readme examples', () => {
  it('work', () => {
    expect(Tuple()).toBeInstanceOf(Tuple.constructor);
    const _tuple0: Tuple0 = Tuple(); // 0-tuple
    const _tuple1: Tuple1<typeof o> = Tuple(o); // 1-tuple
    const _tuple2: Tuple2<typeof o, number> = Tuple(o, 1); // 2-tuple
    // @ts-ignore
    void (Tuple(o) === Tuple(o, 1)); // TS compile error due to different arities
  });
});
