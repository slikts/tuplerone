import { ValueObject } from '../src/tuplerone';

describe(ValueObject.name, () => {
  it('constructs', () => {
    expect(typeof ValueObject({ a: 1, b: 2 })).toBe('object');
  });

  it('structurally equals object', () => {
    expect(ValueObject({ a: 1, b: 2 })).toBe(ValueObject({ a: 1, b: 2 }));
  });

  it('equals identical objects', () => {
    const o = { a: 1, b: 2 };
    expect(ValueObject(o)).toBe(ValueObject(o));
  });

  it("doesn't equal structurally different object", () => {
    expect(ValueObject({ a: 1, b: 2 })).not.toBe(ValueObject({ a: 1, b: 3 }));
  });

  it('supports deep structural equality', () => {
    const o = () => ({ a: { c: 1 }, b: 2 });
    expect(ValueObject(o())).toBe(ValueObject(o()));
    expect(ValueObject(o())).not.toBe(ValueObject({}));
  });

  it('changes reference if value changes', () => {
    const o = { a: { c: 1 }, b: 2 };
    const vO1 = ValueObject(o);
    o.b = 3;
    const vO2 = ValueObject(o);

    expect(vO2.b).toBe(o.b);
    expect(vO1).not.toBe(vO2);
    expect(ValueObject(vO2)).toBe(ValueObject(vO2));
  });

  it('works with primitives', () => {
    expect(() => ValueObject(null)).not.toThrow();
    expect(() => ValueObject(undefined)).not.toThrow();
  });
});
