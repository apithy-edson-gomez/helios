import * as _ from '../src';

describe('identity', () => {
  it('returns the same value', () => {
    const obj = {};
    expect(_.identity(obj)).toBe(obj);
    expect(_.identity(42)).toBe(42);
  });
});

describe('noop', () => {
  it('returns undefined', () => {
    expect(_.noop()).toBeUndefined();
  });
});

describe('constant', () => {
  it('returns function that always returns value', () => {
    const fn = _.constant(42);
    expect(fn()).toBe(42);
    expect(fn(1, 2, 3)).toBe(42);
  });
});

describe('times', () => {
  it('calls iteratee n times', () => {
    expect(_.times(3, String)).toEqual(['0', '1', '2']);
  });
  it('returns array of results', () => {
    expect(_.times(4, () => 0)).toEqual([0, 0, 0, 0]);
  });
});

describe('range', () => {
  it('creates range with start=0', () => {
    expect(_.range(4)).toEqual([0, 1, 2, 3]);
  });
  it('creates range with start and end', () => {
    expect(_.range(1, 5)).toEqual([1, 2, 3, 4]);
  });
  it('creates range with step', () => {
    expect(_.range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });
  it('handles negative step', () => {
    expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });
  it('returns empty for invalid range', () => {
    expect(_.range(0)).toEqual([]);
  });
  it('handles step=0 (treated as 1)', () => {
    expect(_.range(0, 5, 0)).toEqual([0, 1, 2, 3, 4]);
  });
  it('handles single argument with end < start', () => {
    expect(_.range(-4)).toEqual([0, -1, -2, -3]);  // auto step=-1 from start=0 to end=-4
  });
  it('handles negative range', () => {
    expect(_.range(5, 0)).toEqual([5, 4, 3, 2, 1]);
  });
});

describe('property', () => {
  it('creates getter function', () => {
    const getter = _.property('a.b.c');
    expect(getter({ a: { b: { c: 42 } } })).toBe(42);
  });
  it('blocks dangerous paths', () => {
    const getter = _.property('__proto__');
    expect(getter({})).toBeUndefined();
  });
  it('handles bracket notation', () => {
    const getter = _.property('a["b c"].d');
    expect(getter({ a: { 'b c': { d: 10 } } })).toBe(10);
  });
  it('handles array bracket notation', () => {
    const getter = _.property('a[0].b');
    expect(getter({ a: [{ b: 5 }] })).toBe(5);
  });
  it('handles array path', () => {
    const getter = _.property(['a', 'b']);
    expect(getter({ a: { b: 3 } })).toBe(3);
  });
});

describe('matches', () => {
  it('matches objects', () => {
    const matcher = _.matches({ a: 1, b: 2 });
    expect(matcher({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(matcher({ a: 1, c: 2 })).toBe(false);
  });
});

describe('matchesProperty', () => {
  it('checks property match', () => {
    const fn = _.matchesProperty('a.b', 1);
    expect(fn({ a: { b: 1 } })).toBe(true);
    expect(fn({ a: { b: 2 } })).toBe(false);
  });
});

describe('uniqueId', () => {
  it('generates unique IDs', () => {
    const id1 = _.uniqueId();
    const id2 = _.uniqueId();
    expect(id1).not.toBe(id2);
  });
  it('prefixes IDs', () => {
    expect(_.uniqueId('contact_')).toMatch(/^contact_\d+$/);
  });
});

describe('iteratee', () => {
  it('converts function iteratee', () => {
    const fn = _.iteratee(((n: number) => n * 2) as any);
    expect(fn(3)).toBe(6);
  });
  it('converts property shorthand string', () => {
    const fn = _.iteratee('a.b');
    expect(fn({ a: { b: 2 } })).toBe(2);
  });
  it('converts object matcher', () => {
    const fn = _.iteratee({ a: 1 });
    expect(fn({ a: 1, b: 2 })).toBe(true);
  });
  it('converts array path', () => {
    const fn = _.iteratee(['a', 'b']);
    expect(fn({ a: { b: 3 } })).toBe(3);
  });
  it('returns identity for primitives', () => {
    const fn = _.iteratee(42 as any);
    expect(fn(42)).toBe(42);
  });
});

describe('propertyOf', () => {
  it('creates function to get path from fixed object', () => {
    const obj = { a: { b: 1 } };
    const getter = _.propertyOf(obj);
    expect(getter('a.b')).toBe(1);
    expect(getter('x')).toBeUndefined();
  });
  it('blocks dangerous paths', () => {
    const getter = _.propertyOf({});
    expect(getter('__proto__')).toBeUndefined();
  });
});

describe('matches', () => {
  it('matches objects', () => {
    const matcher = _.matches({ a: 1, b: 2 });
    expect(matcher({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(matcher({ a: 1, c: 2 })).toBe(false);
  });
  it('returns false for non-objects', () => {
    const matcher = _.matches({ a: 1 });
    expect(matcher(null)).toBe(false);
    expect(matcher(42)).toBe(false);
  });
  it('matches with arrays', () => {
    const matcher = _.matches({ 0: 1, 1: 2 });
    const arr = [1, 2, 3];
    expect(matcher(arr)).toBe(true);
  });
  it('handles null source', () => {
    const matcher = _.matches(null as any);
    expect(matcher({})).toBe(false);
  });
  it('deep equal comparison', () => {
    const matcher = _.matches({ a: { b: 1 } });
    expect(matcher({ a: { b: 1 } })).toBe(true);
    expect(matcher({ a: { b: 2 } })).toBe(false);
    expect(matcher({ a: { b: 1, c: 2 } })).toBe(false);
  });
  it('handles array vs object mismatch', () => {
    const matcher = _.matches({ 0: 1 });
    expect(matcher([1])).toBe(true);
    expect(matcher({ 0: 1, 1: 2 })).toBe(true);
  });
});

describe('matchesProperty', () => {
  it('checks property match', () => {
    const fn = _.matchesProperty('a.b', 1);
    expect(fn({ a: { b: 1 } })).toBe(true);
    expect(fn({ a: { b: 2 } })).toBe(false);
  });
  it('works with deep paths', () => {
    const fn = _.matchesProperty(['a', 'b', 'c'], 'val');
    expect(fn({ a: { b: { c: 'val' } } })).toBe(true);
    expect(fn({ a: { b: { c: 'other' } } })).toBe(false);
  });
});

describe('rangeRight', () => {
  it('creates descending range', () => {
    expect(_.rangeRight(4)).toEqual([3, 2, 1, 0]);
  });
  it('creates range with start and end', () => {
    expect(_.rangeRight(1, 5)).toEqual([4, 3, 2, 1]);
  });
  it('creates range with step', () => {
    expect(_.rangeRight(0, 20, 5)).toEqual([15, 10, 5, 0]);
  });
  it('handles negative step', () => {
    expect(_.rangeRight(0, -4, -1)).toEqual([-3, -2, -1, 0]);
  });
});

describe('constant', () => {
  it('returns function that always returns value', () => {
    const fn = _.constant(42);
    expect(fn()).toBe(42);
    expect(fn(1, 2, 3)).toBe(42);
  });
  it('works with objects (by reference)', () => {
    const obj = { a: 1 };
    const fn = _.constant(obj);
    expect(fn()).toBe(obj);
  });
});

describe('identity', () => {
  it('returns the first argument', () => {
    expect(_.identity(42)).toBe(42);
    expect(_.identity(undefined)).toBeUndefined();
  });
});
