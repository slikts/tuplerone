import WeakishMap from './WeakishMap';
import { describe, it, expect } from 'vitest';
describe(WeakishMap.name, () => {
  it('is instantiable', () => {
    expect(new WeakishMap()).toBeInstanceOf(WeakishMap);
  });

  it('can set/get primitives', () => {
    expect(new WeakishMap().set('a', 1).get('a')).toBe(1);
  });

  it('can set/get objects', () => {
    const o = {};
    expect(new WeakishMap().set(o, 1).get(o)).toBe(1);
  });

  it('can test primitive membership', () => {
    expect(new WeakishMap().set('a', 1).has('a')).toBe(true);
  });

  it('can test object membership', () => {
    const o = {};
    const m = new WeakishMap().set(o, 1);
    expect(m.has(o)).toBe(true);
    expect(m.has({})).toBe(false);
  });

  it('can get primitive', () => {
    const m = new WeakishMap();
    expect(m.get(1)).toBe(undefined);
    m.set(1, 2);
    expect(m.get(1)).toBe(2);
    expect(m.get(2)).toBe(undefined);
  });

  it('can set twice', () => {
    expect(new WeakishMap().set('a', 1).set('b', 2).get('b')).toBe(2);
  });

  it('can delete a primitive key', () => {
    const m = new WeakishMap<string, number>();
    m.set('a', 1);
    expect(m.delete('a')).toBe(true);
    expect(m.has('a')).toBe(false);
    expect(m.delete('a')).toBe(false);
  });

  it('can delete an object key', () => {
    const m = new WeakishMap<object, number>();
    const o = {};
    m.set(o, 1);
    expect(m.delete(o)).toBe(true);
    expect(m.has(o)).toBe(false);
  });

  it('isEmpty is true when empty, false when not', () => {
    const m = new WeakishMap<string, number>();
    expect(m.isEmpty()).toBe(true);
    m.set('a', 1);
    expect(m.isEmpty()).toBe(false);
    m.delete('a');
    expect(m.isEmpty()).toBe(true);
  });
});
