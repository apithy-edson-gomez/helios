import * as _ from '../src';

describe('get', () => {
  const obj = { a: [{ b: { c: 3 } }] };

  it('gets value by dot path', () => {
    expect(_.get(obj, 'a[0].b.c')).toBe(3);
  });
  it('gets value by array path', () => {
    expect(_.get(obj, ['a', '0', 'b', 'c'])).toBe(3);
  });
  it('returns default for missing path', () => {
    expect(_.get(obj, 'a.b.c', 'default')).toBe('default');
  });
  it('returns undefined for missing path without default', () => {
    expect(_.get(obj, 'x.y.z')).toBeUndefined();
  });
  it('returns default for null object', () => {
    expect(_.get(null as any, 'a.b', 42)).toBe(42);
  });
  /** Security: blocks prototype pollution */
  it('blocks __proto__ access', () => {
    const result = _.get({}, '__proto__');
    expect(result).toBeUndefined();
  });
});

describe('set', () => {
  it('sets value at dot path', () => {
    const obj = {};
    const result = _.set(obj, 'a.b.c', 42);
    expect((result as any).a.b.c).toBe(42);
  });
  it('creates intermediate objects', () => {
    const obj = {};
    _.set(obj, 'a[0].b', 'val');
    expect((obj as any).a[0].b).toBe('val');
  });
  /** Security: blocks prototype pollution */
  it('blocks __proto__ pollution', () => {
    const obj = {};
    const result = _.set(obj, '__proto__.admin', true);
    expect((result as any).admin).toBeUndefined();
    expect(({} as any).admin).toBeUndefined();
  });
});

describe('has', () => {
  const obj = { a: { b: 1 } };
  it('returns true for existing path', () => {
    expect(_.has(obj, 'a.b')).toBe(true);
  });
  it('returns false for missing path', () => {
    expect(_.has(obj, 'a.c')).toBe(false);
  });
  it('returns false for null object', () => {
    expect(_.has(null as any, 'a')).toBe(false);
  });
});

describe('pick', () => {
  it('picks specified keys', () => {
    expect(_.pick({ a: 1, b: 2, c: 3 }, 'a', 'c')).toEqual({ a: 1, c: 3 });
  });
  it('ignores missing keys', () => {
    expect(_.pick({ a: 1 }, 'b')).toEqual({});
  });
});

describe('omit', () => {
  it('omits specified keys', () => {
    expect(_.omit({ a: 1, b: 2, c: 3 }, 'b')).toEqual({ a: 1, c: 3 });
  });
});

describe('keys', () => {
  it('returns object keys', () => {
    expect(_.keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });
});

describe('values', () => {
  it('returns object values', () => {
    expect(_.values({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});

describe('merge', () => {
  it('deeply merges objects', () => {
    const obj = { a: { b: 1 } };
    const result = _.merge(obj, { a: { c: 2 } });
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });
  it('does not mutate sources', () => {
    const obj = { a: 1 };
    const src = { b: 2 };
    _.merge(obj, src);
    expect(src).toEqual({ b: 2 });
  });
  /** Security: blocks prototype pollution via merge */
  it('blocks __proto__ pollution in merge', () => {
    const obj = {};
    _.merge(obj as any, JSON.parse('{"__proto__":{"polluted":"yes"}}'));
    expect(({} as any).polluted).toBeUndefined();
  });
});

describe('invert', () => {
  it('swaps keys and values', () => {
    expect(_.invert({ a: 1, b: 2 })).toEqual({ 1: 'a', 2: 'b' });
  });
  it('blocks __proto__ pollution', () => {
    const result = _.invert({ __proto__: 'x' } as any);
    expect(result).toEqual({});
  });
});

describe('mapKeys', () => {
  it('transforms keys', () => {
    expect(_.mapKeys({ a: 1, b: 2 }, ((v: number, k: string) => k + v) as any)).toEqual({ a1: 1, b2: 2 });
  });
});

describe('mapValues', () => {
  it('transforms values', () => {
    expect(_.mapValues({ a: 1, b: 2 }, ((v: number) => v * 2) as any)).toEqual({ a: 2, b: 4 });
  });
});

describe('pickBy / omitBy', () => {
  it('picks by predicate', () => {
    expect(_.pickBy({ a: 1, b: 2, c: 3 }, ((v: number) => v > 1) as any)).toEqual({ b: 2, c: 3 });
  });
  it('omits by predicate', () => {
    expect(_.omitBy({ a: 1, b: 2, c: 3 }, ((v: number) => v > 1) as any)).toEqual({ a: 1 });
  });
});

describe('at', () => {
  it('gets values at paths', () => {
    expect(_.at({ a: { b: 1, c: 2 } }, 'a.b', 'a.c')).toEqual([1, 2]);
  });
  it('blocks __proto__', () => {
    const result = _.at({}, '__proto__');
    expect(result).toEqual([undefined]);
  });
  it('handles array paths', () => {
    expect(_.at({ a: { b: 1 }, c: 2 }, ['a', 'b'] as any, ['c'] as any)).toEqual([1, 2]);
  });
  it('returns undefined for missing paths', () => {
    expect(_.at({ a: 1 }, 'b')).toEqual([undefined]);
  });
});

describe('set', () => {
  it('creates arrays for integer keys', () => {
    const obj: any = {};
    _.set(obj, 'a.0.b', 'val');
    expect(Array.isArray(obj.a)).toBe(true);
    expect(obj.a[0].b).toBe('val');
  });
  it('overwrites existing values', () => {
    const obj: any = { a: { b: 1 } };
    _.set(obj, 'a.b', 2);
    expect(obj.a.b).toBe(2);
  });
  it('blocks dangerous paths in set', () => {
    const obj: any = {};
    const result = _.set(obj, '__proto__.polluted', true);
    expect(result).toBe(obj);
    expect(({} as any).polluted).toBeUndefined();
  });
});

describe('result', () => {
  it('resolves a value at path', () => {
    const obj = { a: { b: 1 } };
    expect(_.result(obj, 'a.b')).toBe(1);
  });
  it('invokes function at path', () => {
    const obj = { a: { b: () => 42 } };
    expect(_.result(obj, 'a.b')).toBe(42);
  });
  it('returns default for missing path', () => {
    expect(_.result({}, 'x.y', 'default')).toBe('default');
  });
  it('returns undefined for missing without default', () => {
    expect(_.result({}, 'x')).toBeUndefined();
  });
});

describe('invert', () => {
  it('handles overlapping values (later wins)', () => {
    const result = _.invert({ a: 1, b: 1, c: 2 });
    expect(result).toEqual({ '1': 'b', '2': 'c' });
  });
  it('blocks dangerous inverted keys', () => {
    const result = _.invert({ a: '__proto__' } as any);
    expect(result).toEqual({});
  });
});

describe('invertBy', () => {
  it('works with iteratee', () => {
    const result = _.invertBy({ a: 1, b: 2, c: 1 }, (v) => `group-${v}`);
    expect(result).toEqual({ 'group-1': ['a', 'c'], 'group-2': ['b'] });
  });
  it('works without iteratee', () => {
    const result = _.invertBy({ a: 'x', b: 'y' });
    expect(result).toEqual({ x: ['a'], y: ['b'] });
  });
});

describe('merge', () => {
  it('merges arrays', () => {
    const result = _.merge({ a: [1, 2] }, { a: [3, 4] });
    expect(result).toEqual({ a: [3, 4] });
  });
  it('skips null/undefined sources', () => {
    const result = _.merge({ a: 1 }, null as any, undefined as any, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
  it('merges nested plain objects', () => {
    const result = _.merge({ a: { x: 1 } }, { a: { y: 2 } });
    expect(result).toEqual({ a: { x: 1, y: 2 } });
  });
  it('handles Date and RegExp sources', () => {
    const d = new Date('2024-01-01');
    const r = /test/;
    const result = _.merge({}, { d, r } as any) as Record<string, any>;
    expect(result.d).toBe(d);
    expect(result.r).toBe(r);
  });
});

describe('pickBy / omitBy', () => {
  it('pickBy with value predicate', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(_.pickBy(obj, (v) => (v as number) % 2 === 0)).toEqual({ b: 2, d: 4 });
  });
  it('pickBy with key predicate', () => {
    expect(_.pickBy({ a: 1, b: 2 }, (_v, key) => key === 'a')).toEqual({ a: 1 });
  });
  it('omitBy with value predicate', () => {
    expect(_.omitBy({ a: 1, b: 2, c: 3 }, (v) => (v as number) > 1)).toEqual({ a: 1 });
  });
  it('omitBy with key predicate', () => {
    expect(_.omitBy({ a: 1, b: 2 }, (_v, key) => key === 'b')).toEqual({ a: 1 });
  });
});

describe('has', () => {
  it('returns true for deep paths', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(_.has(obj, 'a.b.c')).toBe(true);
  });
  it('returns false for deep missing path', () => {
    const obj = { a: { b: 1 } };
    expect(_.has(obj, 'a.b.c')).toBe(false);
    expect(_.has(obj, 'a.x')).toBe(false);
  });
  it('blocks dangerous keys in has', () => {
    expect(_.has({}, '__proto__')).toBe(false);
    expect(_.has({}, 'constructor')).toBe(false);
  });
});

describe('omit', () => {
  it('omits multiple paths', () => {
    expect(_.omit({ a: 1, b: 2, c: 3, d: 4 }, 'a', 'c')).toEqual({ b: 2, d: 4 });
  });
  it('omits with array paths', () => {
    expect(_.omit({ a: 1, b: 2 }, ['a', 'b'] as any)).toEqual({});
  });
});

describe('toPairs', () => {
  it('returns key-value pairs', () => {
    expect(_.toPairs({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
  });
});

describe('toPairsIn', () => {
  it('returns key-value pairs including inherited', () => {
    class Proto { x!: number }
    const obj = new Proto() as any;
    obj.a = 1;
    const pairs = _.toPairsIn(obj);
    expect(pairs).toContainEqual(['a', 1]);
  });
  it('blocks dangerous keys in toPairsIn', () => {
    const obj: any = { __proto__: 'test' };
    const pairs = _.toPairsIn(obj);
    expect(pairs).not.toContainEqual(['__proto__', 'test']);
  });
});

describe('transform', () => {
  it('works with provided accumulator', () => {
    const result = _.transform(
      { a: 1, b: 2, c: 3 },
      (acc: any, v: any, key: string) => { acc[key] = v; },
      {} as any
    );
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
  it('works without accumulator (defaults to {})', () => {
    const result = _.transform(
      { a: 1, b: 2 },
      (acc: any, v: any, key: string) => { acc[key] = (v as number) * 2; }
    );
    expect(result).toEqual({ a: 2, b: 4 });
  });
});

describe('valuesIn', () => {
  it('returns own and inherited values', () => {
    class Proto { x = 10 }
    const obj = new Proto() as any;
    obj.a = 1;
    const vals = _.valuesIn(obj);
    expect(vals).toContain(1);
    expect(vals).toContain(10);
  });
});
