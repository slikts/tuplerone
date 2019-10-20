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
});
