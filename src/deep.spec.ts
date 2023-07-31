import { getDeepSymbol } from './deep'

describe('DeepCompositeSymbol', () => {
  it('returns symbol', () => {
    expect(typeof getDeepSymbol({})).toBe('symbol')
  })

  it('supports empty objects and arrays', () => {
    expect(getDeepSymbol({})).toStrictEqual(getDeepSymbol({}))
    expect(getDeepSymbol([])).toStrictEqual(getDeepSymbol([]))
  })

  it('structurally equals shallow object', () => {
    expect(getDeepSymbol({ a: 1, b: 2 })).toStrictEqual(getDeepSymbol({ a: 1, b: 2 }));
    expect(getDeepSymbol({ a: 1, b: 2, c: 3 })).not.toStrictEqual(getDeepSymbol({ a: 1, b: 2 }));
  });

  it('supports arrays', () => {
    expect(getDeepSymbol([1,2,3])).toStrictEqual(getDeepSymbol([1,2,3]))
    expect(getDeepSymbol([1,2,3,4])).not.toStrictEqual(getDeepSymbol([1,2,3]))
  })

  it('supports deep nesting', () => {
    expect(getDeepSymbol([1, [2, 3]])).toStrictEqual(getDeepSymbol([1, getDeepSymbol([2, 3])]))
    expect(getDeepSymbol({ a: { b: 1, c: 2 }})).toStrictEqual(getDeepSymbol({ a: getDeepSymbol({ b: 1, c: 2 })}))
    expect(getDeepSymbol([1, { a: 1 }])).toStrictEqual(getDeepSymbol([1, { a: 1 }]))
    expect(getDeepSymbol([1, { a: 1 }])).toStrictEqual(getDeepSymbol([1, getDeepSymbol({ a: 1 })]))
    expect(getDeepSymbol({a: 1, b: [2, 3] })).toStrictEqual(getDeepSymbol({ a: 1, b: getDeepSymbol([2, 3]) }))
  })

  it("doesn't equal structurally different object", () => {
    expect(getDeepSymbol({ a: 1, b: 2 })).not.toStrictEqual(getDeepSymbol({ a: 1, b: 3 }));
  });
});
