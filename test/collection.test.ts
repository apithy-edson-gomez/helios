import * as _ from '../src';

describe('forEach', () => {
  it('iterates over array', () => {
    const result: number[] = [];
    _.forEach([1, 2, 3], (v) => result.push(v));
    expect(result).toEqual([1, 2, 3]);
  });
  it('iterates over object values', () => {
    const result: number[] = [];
    _.forEach({ a: 1, b: 2 }, (v) => result.push(v));
    expect(result).toEqual([1, 2]);
  });
  it('returns the collection', () => {
    const arr = [1, 2, 3];
    expect(_.forEach(arr, () => {})).toBe(arr);
  });
  it('passes (value, key/index, collection) arguments', () => {
    const indices: any[] = [];
    _.forEach({ a: 1, b: 2 }, (_v: any, k: any) => indices.push(k));
    expect(indices).toEqual(['a', 'b']);
  });
});

describe('map', () => {
  it('maps over array', () => {
    expect(_.map([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
  });
  it('maps over object values', () => {
    expect(_.map({ a: 1, b: 2 }, (v) => v * 2)).toEqual([2, 4]);
  });
  it('handles empty collection', () => {
    expect(_.map([], (n: any) => n * 2)).toEqual([]);
  });
  it('handles null/undefined', () => {
    expect(_.map(null as any, (n: any) => n * 2)).toEqual([]);
  });
});

describe('filter', () => {
  it('filters array', () => {
    expect(_.filter([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
  });
  it('filters object', () => {
    expect(_.filter({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual([2, 3]);
  });
  it('handles empty', () => {
    expect(_.filter([], () => true)).toEqual([]);
  });
});

describe('every', () => {
  it('returns true when all pass', () => {
    expect(_.every([true, 1, 'yes'], Boolean)).toBe(true);
  });
  it('short-circuits on false', () => {
    expect(_.every([true, false, true], Boolean)).toBe(false);
  });
  it('handles empty array (vacuously true)', () => {
    expect(_.every([], Boolean)).toBe(true);
  });
});

describe('some', () => {
  it('returns true when any pass', () => {
    expect(_.some([null, 0, 'yes'], Boolean)).toBe(true);
  });
  it('short-circuits on true', () => {
    expect(_.some([true, false], Boolean)).toBe(true);
  });
  it('returns false when none pass', () => {
    expect(_.some([null, 0, ''], Boolean)).toBe(false);
  });
});

describe('find', () => {
  it('finds first matching element', () => {
    expect(_.find([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(2);
  });
  it('returns undefined when not found', () => {
    expect(_.find([1, 3, 5], (n) => n % 2 === 0)).toBeUndefined();
  });
  it('respects fromIndex', () => {
    expect(_.find([2, 4, 6, 8], (n) => n > 4, 3)).toBe(8);
  });
});

describe('flatMap', () => {
  it('maps and flattens', () => {
    expect(_.flatMap([1, 2], (n) => [n, n])).toEqual([1, 1, 2, 2]);
  });
});

describe('flatMapDeep', () => {
  it('maps and deeply flattens', () => {
    expect(_.flatMapDeep([1, 2], (n) => [[n, [n]]])).toEqual([1, 1, 2, 2]);
  });
});

describe('groupBy', () => {
  it('groups by iteratee result', () => {
    expect(_.groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': [4.2], '6': [6.1, 6.3] });
  });
  it('handles empty', () => {
    expect(_.groupBy([], Math.floor)).toEqual({});
  });
});

describe('keyBy', () => {
  it('creates object keyed by iteratee', () => {
    expect(_.keyBy([
      { id: 'a', val: 1 },
      { id: 'b', val: 2 },
    ], (o: any) => o.id)).toEqual({ a: { id: 'a', val: 1 }, b: { id: 'b', val: 2 } });
  });
  it('last value wins for duplicate keys', () => {
    expect(_.keyBy([{ id: 'a', v: 1 }, { id: 'a', v: 2 }], (o: any) => o.id))
      .toEqual({ a: { id: 'a', v: 2 } });
  });
});

describe('includes', () => {
  it('checks array for value', () => {
    expect(_.includes([1, 2, 3], 1)).toBe(true);
    expect(_.includes([1, 2, 3], 4)).toBe(false);
  });
  it('checks object for value', () => {
    expect(_.includes({ a: 1, b: 2 }, 1)).toBe(true);
  });
  it('checks string for substring', () => {
    expect(_.includes('hello', 'ell')).toBe(true);
    expect(_.includes('hello', 'x')).toBe(false);
  });
  it('respects fromIndex', () => {
    expect(_.includes([1, 2, 3], 1, 1)).toBe(false);
  });
});

describe('partition', () => {
  it('splits into truthy and falsy groups', () => {
    expect(_.partition([1, 0, 2, ''], Boolean)).toEqual([[1, 2], [0, '']]);
  });
});

describe('reduce', () => {
  it('reduces array', () => {
    expect(_.reduce([1, 2, 3], (acc: number, n: number) => acc + n, 0)).toBe(6);
  });
  it('reduces without accumulator (first element as initial)', () => {
    expect(_.reduce([1, 2, 3], (acc: number, n: number) => acc + n)).toBe(6);
  });
  it('reduces object', () => {
    expect(_.reduce({ a: 1, b: 2 }, (acc: number, v: number) => acc + v, 0)).toBe(3);
  });
});

describe('reject', () => {
  it('opposite of filter', () => {
    expect(_.reject([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([1, 3]);
  });
});

describe('sample', () => {
  it('returns element from array', () => {
    expect([1, 2, 3]).toContain(_.sample([1, 2, 3]));
  });
  it('returns undefined for empty', () => {
    expect(_.sample([])).toBeUndefined();
  });
});

describe('sampleSize', () => {
  it('returns n random elements', () => {
    const result = _.sampleSize([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
    expect(result.every((v) => [1, 2, 3, 4, 5].includes(v))).toBe(true);
  });
});

describe('shuffle', () => {
  it('returns array of same length', () => {
    const result = _.shuffle([1, 2, 3, 4]);
    expect(result).toHaveLength(4);
    expect(result.sort()).toEqual([1, 2, 3, 4]);
  });
  it('does not mutate original', () => {
    const arr = [1, 2, 3];
    _.shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('size', () => {
  it('returns array length', () => {
    expect(_.size([1, 2, 3])).toBe(3);
  });
  it('returns object key count', () => {
    expect(_.size({ a: 1, b: 2 })).toBe(2);
  });
  it('returns string length', () => {
    expect(_.size('hello')).toBe(5);
  });
  it('returns 0 for null', () => {
    expect(_.size(null as any)).toBe(0);
  });
});

describe('orderBy', () => {
  const users = [
    { user: 'fred', age: 48 },
    { user: 'barney', age: 34 },
    { user: 'fred', age: 40 },
    { user: 'barney', age: 36 },
  ];
  it('sorts by iteratee in order', () => {
    const sorted = _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
    expect(sorted[0]).toEqual({ user: 'barney', age: 36 });
    expect(sorted[3]).toEqual({ user: 'fred', age: 40 });
  });
});

describe('sortBy', () => {
  it('sorts ascending by iteratee', () => {
    expect(_.sortBy([3, 1, 2], (n: number) => n)).toEqual([1, 2, 3]);
  });
});

describe('countBy', () => {
  it('counts by iteratee', () => {
    expect(_.countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 });
  });
  it('counts by property string', () => {
    const result = _.countBy([{ n: 1 }, { n: 2 }, { n: 1 }], 'n' as any);
    expect(result).toEqual({ '1': 2, '2': 1 });
  });
  it('returns empty for null', () => {
    expect(_.countBy(null as any)).toEqual({});
  });
});

describe('invokeMap', () => {
  it('invokes method at path', () => {
    expect(_.invokeMap([['a', 'b'], ['c', 'd']], 'join', '~')).toEqual(['a~b', 'c~d']);
  });
  it('handles null elements', () => {
    const result = _.invokeMap([null, ['a']], 'join' as any, ',');
    expect(result).toEqual([undefined, 'a']);
  });
  it('returns undefined for non-function method', () => {
    expect(_.invokeMap([{ x: 1 }], 'x')).toEqual([undefined]);
  });
});

describe('every', () => {
  it('returns true for empty/vacuous', () => {
    expect(_.every([], Boolean)).toBe(true);
    expect(_.every(null as any, Boolean)).toBe(true);
  });
  it('works with object matcher predicate', () => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: true },
    ];
    expect(_.every(users, { user: 'barney', active: true } as any)).toBe(false);
    expect(_.every(users, { active: true } as any)).toBe(true);
  });
  it('works with [key, value] predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: true },
    ];
    expect(_.every(users, ['active', true] as any)).toBe(true);
    expect(_.every(users, ['active', false] as any)).toBe(false);
  });
  it('works with property key predicate', () => {
    expect(_.every([{ a: 1 }, { a: 2 }], 'a' as any)).toBe(true);
    expect(_.every([{ a: 0 }], 'a' as any)).toBe(false);
  });
});

describe('find', () => {
  it('works with object matcher', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
    ];
    expect(_.find(users, { age: 40 } as any)).toEqual({ user: 'fred', age: 40 });
  });
  it('returns undefined for null collection', () => {
    expect(_.find(null as any, () => true)).toBeUndefined();
  });
});

describe('filter', () => {
  it('works with property shorthand', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    expect(_.filter(users, 'active' as any)).toEqual([{ user: 'barney', active: true }]);
  });
  it('works with object matcher', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
    ];
    expect(_.filter(users, { age: 36 } as any)).toEqual([{ user: 'barney', age: 36 }]);
  });
  it('works with [key, value] predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    expect(_.filter(users, ['active', true] as any)).toEqual([{ user: 'barney', active: true }]);
  });
  it('handles null/undefined', () => {
    expect(_.filter(null as any)).toEqual([]);
  });
});

describe('forEachRight', () => {
  it('iterates array right to left', () => {
    const result: number[] = [];
    _.forEachRight([1, 2, 3], (v) => result.push(v));
    expect(result).toEqual([3, 2, 1]);
  });
  it('iterates string right to left', () => {
    const result: string[] = [];
    _.forEachRight('abc', (ch: any) => result.push(ch));
    expect(result).toEqual(['c', 'b', 'a']);
  });
  it('iterates object right to left', () => {
    const result: string[] = [];
    _.forEachRight({ a: 1, b: 2 }, (_v: any, k: any) => result.push(k));
    expect(result).toEqual(['b', 'a']);
  });
  it('iterates Map right to left', () => {
    const result: number[] = [];
    const map = new Map([['a', 1], ['b', 2]]);
    _.forEachRight(map as any, (v: any) => result.push(v));
    expect(result).toEqual([2, 1]);
  });
  it('iterates Set right to left', () => {
    const result: number[] = [];
    const set = new Set([1, 2, 3]);
    _.forEachRight(set as any, (v: any) => result.push(v));
    expect(result).toEqual([3, 2, 1]);
  });
  it('returns collection for null', () => {
    expect(_.forEachRight(null as any, () => {})).toBeNull();
  });
});

describe('groupBy', () => {
  it('groups by property string', () => {
    const users = [
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 30 },
    ];
    const grouped = _.groupBy(users, 'user' as any);
    expect(grouped.fred).toHaveLength(2);
    expect(grouped.barney).toHaveLength(1);
  });
  it('handles empty collection', () => {
    expect(_.groupBy([], Math.floor)).toEqual({});
    expect(_.groupBy(null as any, Math.floor)).toEqual({});
  });
});

describe('includes', () => {
  it('works with Map', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    expect(_.includes(map as any, 'a')).toBe(true);
    expect(_.includes(map as any, 'c')).toBe(false);
  });
  it('works with Set', () => {
    const set = new Set([1, 2, 3]);
    expect(_.includes(set as any, 2)).toBe(true);
    expect(_.includes(set as any, 4)).toBe(false);
  });
  it('handles NaN with SameValueZero', () => {
    expect(_.includes([1, NaN, 3], NaN)).toBe(true);
  });
  it('handles fromIndex for arrays', () => {
    expect(_.includes([1, 2, 3], 1, 1)).toBe(false);
    expect(_.includes([1, 2, 1], 1, 2)).toBe(true);
  });
  it('handles null collection', () => {
    expect(_.includes(null as any, 1)).toBe(false);
  });
  it('returns false for non-string value in string collection', () => {
    expect(_.includes('hello', 123 as any)).toBe(false);
  });
});

describe('map', () => {
  it('works with property string', () => {
    const users = [
      { user: 'barney' },
      { user: 'fred' },
    ];
    expect(_.map(users, 'user' as any)).toEqual(['barney', 'fred']);
  });
  it('handles null objects in array', () => {
    expect(_.map([null, { a: 1 }], 'a' as any)).toEqual([undefined, 1]);
  });
  it('handles empty collection', () => {
    expect(_.map([], () => 1)).toEqual([]);
  });
});

describe('orderBy', () => {
  const users = [
    { user: 'fred', age: 48 },
    { user: 'barney', age: 34 },
    { user: 'fred', age: 40 },
    { user: 'barney', age: 36 },
  ];
  it('sorts by iteratee in order', () => {
    const sorted = _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
    expect(sorted[0]).toEqual({ user: 'barney', age: 36 });
    expect(sorted[3]).toEqual({ user: 'fred', age: 40 });
  });
  it('works with single iteratee and single order', () => {
    const sorted = _.orderBy(users, 'user' as any, 'desc');
    expect(sorted[0].user).toBe('fred');
    expect(sorted[3].user).toBe('barney');
  });
  it('handles null/undefined orders (defaults to asc)', () => {
    const sorted = _.orderBy([3, 1, 2]);
    expect(sorted).toEqual([1, 2, 3]);
  });
  it('handles null collection', () => {
    expect(_.orderBy(null as any)).toEqual([]);
  });
});

describe('sampleSize', () => {
  it('returns n random elements', () => {
    const result = _.sampleSize([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
    expect(result.every((v) => [1, 2, 3, 4, 5].includes(v))).toBe(true);
  });
  it('returns all elements when n > length', () => {
    const result = _.sampleSize([1, 2], 5);
    expect(result).toHaveLength(2);
  });
  it('returns empty for n=0', () => {
    expect(_.sampleSize([1, 2, 3], 0)).toEqual([]);
  });
  it('returns empty for null collection', () => {
    expect(_.sampleSize(null as any)).toEqual([]);
  });
  it('returns one element by default', () => {
    const result = _.sampleSize([1, 2, 3]);
    expect(result).toHaveLength(1);
  });
});

describe('shuffle', () => {
  it('returns array of same length', () => {
    const result = _.shuffle([1, 2, 3, 4]);
    expect(result).toHaveLength(4);
    expect(result.sort()).toEqual([1, 2, 3, 4]);
  });
  it('handles single element', () => {
    expect(_.shuffle([42])).toEqual([42]);
  });
  it('returns empty for null', () => {
    expect(_.shuffle(null as any)).toEqual([]);
  });
});

describe('flatMap', () => {
  it('maps and flattens', () => {
    expect(_.flatMap([1, 2], (n) => [n, n])).toEqual([1, 1, 2, 2]);
  });
  it('handles null collection', () => {
    expect(_.flatMap(null as any)).toEqual([]);
  });
});

describe('flatMapDeep', () => {
  it('maps and deeply flattens', () => {
    expect(_.flatMapDeep([1, 2], (n) => [[n, [n]]])).toEqual([1, 1, 2, 2]);
  });
  it('handles null collection', () => {
    expect(_.flatMapDeep(null as any)).toEqual([]);
  });
});

describe('flatMapDepth', () => {
  it('maps and flattens to specific depth', () => {
    expect(_.flatMapDepth([1, 2], (n) => [[n, [n]]], 1)).toEqual([[1, [1]], [2, [2]]]);
  });
  it('handles null collection', () => {
    expect(_.flatMapDepth(null as any)).toEqual([]);
  });
});

describe('reduce', () => {
  it('reduces without accumulator (first element as initial)', () => {
    expect(_.reduce([1, 2, 3], (acc: number, n: number) => acc + n)).toBe(6);
  });
  it('reduces object', () => {
    expect(_.reduce({ a: 1, b: 2 }, (acc: number, v: number) => acc + v, 0)).toBe(3);
  });
  it('handles null collection with accumulator', () => {
    expect(_.reduce(null as any, (acc: any) => acc, 42)).toBe(42);
  });
  it('throws for empty with no accumulator', () => {
    expect(() => _.reduce([], (acc: any) => acc)).toThrow('reduce of empty');
  });
});

describe('reject', () => {
  it('opposite of filter', () => {
    expect(_.reject([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([1, 3]);
  });
  it('handles null collection', () => {
    expect(_.reject(null as any, () => true)).toEqual([]);
  });
  it('works with object', () => {
    const result = _.reject({ a: 1, b: 2, c: 3 }, (v) => (v as number) > 1);
    expect(result).toEqual([1]);
  });
});

describe('size', () => {
  it('handles surrogate pairs in string', () => {
    expect(_.size('𠀀')).toBe(1);
    expect(_.size('a𠀀b')).toBe(3);
  });
  it('handles Map and Set', () => {
    expect(_.size(new Map([['a', 1]]))).toBe(1);
    expect(_.size(new Set([1, 2, 3]))).toBe(3);
  });
  it('returns 0 for numbers', () => {
    expect(_.size(42 as any)).toBe(0);
  });
});

describe('some', () => {
  it('handles null collection', () => {
    expect(_.some(null as any, () => true)).toBe(false);
  });
});

describe('sortBy', () => {
  it('sorts by string iteratee', () => {
    const users = [
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
    ];
    const sorted = _.sortBy(users, 'user' as any);
    expect(sorted[0].user).toBe('barney');
    expect(sorted[1].user).toBe('fred');
  });
  it('handles null collection', () => {
    expect(_.sortBy(null as any)).toEqual([]);
  });
});
