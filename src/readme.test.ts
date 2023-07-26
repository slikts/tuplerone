/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tuple, Tuple0, Tuple1, Tuple2 } from './tuplerone';

// Dummy object
const o = {};
describe('readme examples', () => {
  it('work', () => {
    expect(Tuple()).toBeInstanceOf(Tuple.constructor);
    const tuple0: Tuple0 = Tuple(); // 0-tuple
    const tuple1: Tuple1<typeof o> = Tuple(o); // 1-tuple
    const tuple2: Tuple2<typeof o, number> = Tuple(o, 1); // 2-tuple
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Tuple(o) === Tuple(o, 1); // TS compile error due to different arities
  });
});
