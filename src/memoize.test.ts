import { memoize } from '../src/memoize';
import { describe, it, expect } from 'vitest';
describe(memoize.name, () => {
  it('returns a function', () => {
    expect(memoize(() => {})).toBeInstanceOf(Function);
  });

  it('returns the same object', () => {
    const f = memoize((_a: unknown) => ({}));
    const o = f(1);
    expect(f(1)).toBe(o);
    expect(f(1)).toBe(o);
    expect(f(2)).not.toBe(o);
  });

  it('supports multiple arguments', () => {
    const f = memoize((_a: unknown, _b: unknown, _c: unknown) => ({}));
    const o = f(1, 2, 3);
    expect(f(1, 2, 3)).toBe(o);
    expect(f(1, 2, 3)).toBe(o);
    expect(f(2, 3, 4)).not.toBe(o);
  });

  it('supports setting receiver', () => {
    const f = memoize(function (this: unknown) {
      return this;
    });
    expect(f.call(123)).toBe(123);
  });

  it('receiver is memoized', () => {
    let n = 0;
    const f = memoize((x: unknown) => {
      n += x as number;
      return n;
    });
    const o = {};
    expect(f.call(o, 1)).toBe(1);
    expect(f.call(o, 1)).toBe(1);
    expect(f.call(o, 2)).toBe(3);
  });

  it('supports custom caches that can be isolated or cleared', () => {
    const customCache = new WeakMap();
    let calls = 0;
    const f = memoize(() => ++calls, customCache);

    expect(f()).toBe(1);
    expect(f()).toBe(1);

    // Replace cache manually to verify isolation overrides
    const isolatedF = memoize(() => ++calls, new WeakMap());
    expect(isolatedF()).toBe(2);
    expect(isolatedF()).toBe(2);
  });

  it('supports mapping primitive this values properly', () => {
    let calls = 0;
    const f = memoize(function (this: unknown) {
      calls++;
      return this;
    });

    expect(f.call(123)).toBe(123);
    expect(f.call(123)).toBe(123);
    expect(calls).toBe(1); // Memoized

    expect(f.call('hello')).toBe('hello');
    expect(calls).toBe(2); // New primitive -> calls again
  });

  it('does not cache exceptions or handle promises unexpectedly', async () => {
    let shouldThrow = true;
    const f = memoize(() => {
      if (shouldThrow) throw new Error('fail');
      return 'success';
    });

    expect(() => f()).toThrowError('fail');
    shouldThrow = false;
    expect(f()).toBe('success'); // Re-executed because the getter threw natively, meaning no internal WeakMap.set was called

    const p = memoize(async () => 'promise result');
    const result1 = p();
    const result2 = p();
    expect(result1).toBe(result2); // The exact same Promise reference is cached
    expect(await result1).toBe('promise result');
  });
});
