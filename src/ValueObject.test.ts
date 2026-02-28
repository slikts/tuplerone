import { ValueObject } from '../src/tuplerone';
import { isRef, shallow } from '../src/shallow';
import { describe, it, expect } from 'vitest';

describe(ValueObject.name, () => {
  it('constructs', () => {
    expect(typeof ValueObject({ a: 1, b: 2 })).toBe('object');
  });

  it('works on flat objects', () => {
    expect(ValueObject({})).toBe(ValueObject({}));
    expect(ValueObject({})).not.toBe(ValueObject({ a: 1 }));
    expect(ValueObject({ a: 1, b: 2 })).toBe(ValueObject({ a: 1, b: 2 }));
    expect(ValueObject({ a: 1, b: 2 })).not.toBe(ValueObject({ a: 1, b: 2, c: 3 }));
  });

  it('works on flat arrays', () => {
    expect(ValueObject([])).toBe(ValueObject([]));
    expect(ValueObject([])).not.toBe(ValueObject([1]));
    expect(ValueObject([1, 2])).toBe(ValueObject([1, 2]));
    expect(ValueObject([1, 2])).not.toBe(ValueObject([1, 2, 3]));
  });

  it('works on nested objects', () => {
    expect(ValueObject({ a: 1, b: { c: 2 } })).toBe(ValueObject({ a: 1, b: { c: 2 } }));
    expect(ValueObject({ a: 1, b: [2] })).toBe(ValueObject({ a: 1, b: [2] }));
  });

  it('works on sub-objects', () => {
    const { a } = ValueObject({ a: { b: 1 } });
    expect(a).toBe(ValueObject({ b: 1 }));
  });

  it('supports circular objects', () => {
    const a: any = {};
    const b = { a };
    a.b = b;
    expect(() => ValueObject(a)).toThrow();
    a[isRef] = true;
    expect(ValueObject(a)).toBe(a);
    expect(ValueObject(shallow(b))).toBe(b);
  });

  it('throws on construct', () => {
    //@ts-ignore
    expect(() => new ValueObject()).toThrow();
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
});
