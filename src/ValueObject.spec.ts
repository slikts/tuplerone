import { ValueObject } from "./ValueObject.ts";

describe('ValueObject', () => {
  it('works on flat objects', () => {
    expect(ValueObject({})).toStrictEqual(ValueObject({}));
    expect(ValueObject({})).not.toStrictEqual(ValueObject({ a: 1}));
    expect(ValueObject({ a: 1, b: 2 })).toStrictEqual(ValueObject({ a: 1, b: 2 }));
    expect(ValueObject({ a: 1, b: 2 })).not.toStrictEqual(ValueObject({ a: 1, b: 2, c: 3 }));
  })

  it('works on flat arrays', () => {
    expect(ValueObject([])).toStrictEqual(ValueObject([]));
    expect(ValueObject([])).not.toStrictEqual(ValueObject([1]));
    expect(ValueObject([1, 2])).toStrictEqual(ValueObject([1, 2]));
    expect(ValueObject([1, 2])).not.toStrictEqual(ValueObject([1, 2, 3]));
  });

  it('works on nested objects', () => {
    expect(ValueObject({ a: 1, b: { c: 2 } })).toStrictEqual(ValueObject({ a: 1, b: { c: 2 } }));
    expect(ValueObject({ a: 1, b: [ 2 ] })).toStrictEqual(ValueObject({ a: 1, b: [ 2 ] }));
  })

  it('works on sub-objects', () => {
    const { a } = ValueObject({ a: { b:  1 } })
    expect(a).toStrictEqual(ValueObject({ b: 1 }))
  })
})
