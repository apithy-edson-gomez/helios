import * as _ from '../src';

// ============================================================
// Array tests
// ============================================================

describe('chunk', () => {
  it('splits array into chunks of given size', () => {
    expect(_.chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });
  it('handles uneven chunks', () => {
    expect(_.chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
  });
  it('returns empty array for empty input', () => {
    expect(_.chunk([], 2)).toEqual([]);
  });
  it('returns empty array for size < 1', () => {
    expect(_.chunk([1, 2], 0)).toEqual([]);
  });
  it('defaults size to 1', () => {
    expect(_.chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });
  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4];
    _.chunk(arr, 2);
    expect(arr).toEqual([1, 2, 3, 4]);
  });
});

describe('compact', () => {
  it('removes falsy values', () => {
    expect(_.compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });
  it('handles all truthy', () => {
    expect(_.compact([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it('handles all falsy', () => {
    expect(_.compact([0, false, null, undefined, ''])).toEqual([]);
  });
  it('handles empty array', () => {
    expect(_.compact([])).toEqual([]);
  });
});

describe('concat', () => {
  it('concatenates values and arrays', () => {
    const arr = [1];
    expect(_.concat(arr, 2, [3], [[4]])).toEqual([1, 2, 3, [4]]);
  });
  it('does not mutate original', () => {
    const arr = [1];
    _.concat(arr, 2);
    expect(arr).toEqual([1]);
  });
});

describe('difference', () => {
  it('returns values not in exclusion arrays', () => {
    expect(_.difference([2, 1, 3], [2, 3])).toEqual([1]);
  });
  it('handles multiple exclusion arrays', () => {
    expect(_.difference([2, 1, 3, 4], [2, 3], [4])).toEqual([1]);
  });
  it('returns empty when all excluded', () => {
    expect(_.difference([1, 2], [1, 2])).toEqual([]);
  });
});

describe('differenceBy', () => {
  it('uses iteratee for comparison', () => {
    expect(_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
  });
  it('works with property shorthand', () => {
    expect(_.differenceBy(
      [{ x: 2 }, { x: 1 }],
      [{ x: 1 }],
      (o: any) => o.x
    )).toEqual([{ x: 2 }]);
  });
  it('works with no iteratee (falls back to identity)', () => {
    expect(_.differenceBy([2, 1], [2, 3] as any)).toEqual([1]);
  });
  it('handles non-array values gracefully', () => {
    expect(_.differenceBy([1, 2, 3], null as any, undefined as any)).toEqual([1, 2, 3]);
  });
});

describe('differenceWith', () => {
  it('uses custom comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    expect(_.differenceWith(objects, [{ x: 1, y: 2 }], (a: any, b: any) => a.x === b.x && a.y === b.y))
      .toEqual([{ x: 2, y: 1 }]);
  });
  it('uses default comparator when none provided', () => {
    expect(_.differenceWith([1, 2, 3], [2, 4])).toEqual([1, 3]);
  });
});

describe('drop', () => {
  it('drops first n elements', () => {
    expect(_.drop([1, 2, 3], 2)).toEqual([3]);
  });
  it('defaults to dropping 1', () => {
    expect(_.drop([1, 2, 3])).toEqual([2, 3]);
  });
  it('returns empty when n >= length', () => {
    expect(_.drop([1, 2], 5)).toEqual([]);
  });
});

describe('dropRight', () => {
  it('drops last n elements', () => {
    expect(_.dropRight([1, 2, 3], 2)).toEqual([1]);
  });
  it('defaults to dropping 1', () => {
    expect(_.dropRight([1, 2, 3])).toEqual([1, 2]);
  });
  it('returns empty when n >= length', () => {
    expect(_.dropRight([1, 2], 5)).toEqual([]);
  });
});

describe('dropWhile', () => {
  it('drops elements while predicate returns truthy', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
    ];
    expect(_.dropWhile(users, (o) => !o.active)).toEqual([{ user: 'pebbles', active: true }]);
  });
  it('drops nothing when first element fails predicate', () => {
    expect(_.dropWhile([1, 2, 3], (n) => n > 5)).toEqual([1, 2, 3]);
  });
  it('drops all when all pass predicate', () => {
    expect(_.dropWhile([1, 2, 3], (n) => n < 10)).toEqual([]);
  });
  it('handles empty array', () => {
    expect(_.dropWhile([], (_n) => true)).toEqual([]);
  });
  it('provides index parameter to predicate', () => {
    expect(_.dropWhile([1, 2, 3, 4, 5], (_n, i) => i < 3)).toEqual([4, 5]);
  });
});

describe('dropRightWhile', () => {
  it('drops elements from end while predicate returns truthy', () => {
    const users = [
      { user: 'barney', active: false },
      { user: 'fred', active: true },
      { user: 'pebbles', active: true },
    ];
    expect(_.dropRightWhile(users, (o) => o.active)).toEqual([{ user: 'barney', active: false }]);
  });
  it('drops nothing when last element fails predicate', () => {
    expect(_.dropRightWhile([1, 2, 3], (n) => n > 5)).toEqual([1, 2, 3]);
  });
  it('drops all when all pass predicate from end', () => {
    expect(_.dropRightWhile([1, 2, 3], (n) => n > 0)).toEqual([]);
  });
  it('handles empty array', () => {
    expect(_.dropRightWhile([], (_n) => true)).toEqual([]);
  });
});

describe('fill', () => {
  it('fills entire array with value', () => {
    const arr = [1, 2, 3];
    expect(_.fill(arr, 'a')).toEqual(['a', 'a', 'a']);
  });
  it('fills from start to end', () => {
    const arr = [4, 6, 8, 10];
    expect(_.fill(arr, '*', 1, 3)).toEqual([4, '*', '*', 10]);
  });
  it('mutates and returns the array', () => {
    const arr = [1, 2, 3];
    const result = _.fill(arr, 'x');
    expect(result).toBe(arr);
  });
  it('handles negative start', () => {
    const arr = [1, 2, 3, 4];
    expect(_.fill(arr, '*', -3, -1)).toEqual([1, '*', '*', 4]);
  });
  it('handles negative end', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(_.fill(arr, '*', -4, -2)).toEqual([1, '*', '*', 4, 5]);
  });
});

describe('findIndex', () => {
  it('returns index of first element passing predicate', () => {
    expect(_.findIndex([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(1);
  });
  it('returns -1 when not found', () => {
    expect(_.findIndex([1, 3, 5], (n) => n % 2 === 0)).toBe(-1);
  });
  it('respects fromIndex', () => {
    expect(_.findIndex([2, 4, 6, 8], (n) => n > 4, 3)).toBe(3);
  });
  it('handles negative fromIndex', () => {
    expect(_.findIndex([1, 2, 3, 4, 5], (n) => n > 2, -3)).toBe(2);
  });
  it('works with object arrays', () => {
    const users = [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }];
    expect(_.findIndex(users, (o) => o.user === 'fred')).toBe(1);
  });
});

describe('findLastIndex', () => {
  it('returns index of last element passing predicate', () => {
    expect(_.findLastIndex([1, 2, 3, 4, 5], (n) => n % 2 === 1)).toBe(4);
  });
  it('returns -1 when not found', () => {
    expect(_.findLastIndex([1, 3, 5], (n) => n % 2 === 0)).toBe(-1);
  });
  it('respects fromIndex', () => {
    expect(_.findLastIndex([1, 2, 3, 4], (n) => n > 1, 2)).toBe(2);
  });
  it('handles fromIndex at the start', () => {
    expect(_.findLastIndex([1, 2, 3, 4], (n) => n === 1, 0)).toBe(0);
  });
});

describe('flatten', () => {
  it('flattens one level', () => {
    expect(_.flatten([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
  });
  it('handles empty array', () => {
    expect(_.flatten([])).toEqual([]);
  });
});

describe('flattenDeep', () => {
  it('recursively flattens', () => {
    expect(_.flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
});

describe('flattenDepth', () => {
  it('flattens to specified depth', () => {
    expect(_.flattenDepth([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });
  it('defaults to depth 1', () => {
    expect(_.flattenDepth([1, [2, [3]]])).toEqual([1, 2, [3]]);
  });
});

describe('fromPairs', () => {
  it('converts pairs to object', () => {
    expect(_.fromPairs([['a', 1], ['b', 2]])).toEqual({ a: 1, b: 2 });
  });
  it('blocks prototype pollution', () => {
    const result = _.fromPairs([['__proto__', 'polluted']] as any);
    expect(({}).constructor).not.toBe('polluted');
    expect(result).toEqual({});
  });
  it('blocks constructor key', () => {
    const result = _.fromPairs([['constructor', { a: 1 }]] as any);
    expect(result).toEqual({});
  });
});

describe('head / first', () => {
  it('returns first element', () => {
    expect(_.head([1, 2, 3])).toBe(1);
    expect(_.first([1, 2, 3])).toBe(1);
  });
  it('returns undefined for empty', () => {
    expect(_.head([])).toBeUndefined();
  });
});

describe('indexOf', () => {
  it('finds index of value', () => {
    expect(_.indexOf([1, 2, 1, 2], 2)).toBe(1);
  });
  it('returns -1 when not found', () => {
    expect(_.indexOf([1, 2], 3)).toBe(-1);
  });
  it('finds NaN correctly (SameValueZero)', () => {
    expect(_.indexOf([1, NaN, 3], NaN)).toBe(1);
  });
  it('respects fromIndex', () => {
    expect(_.indexOf([1, 2, 1, 2], 2, 2)).toBe(3);
  });
  it('handles negative fromIndex', () => {
    expect(_.indexOf([1, 2, 1, 2], 2, -2)).toBe(3);
  });
  it('handles negative fromIndex wrapping to 0', () => {
    expect(_.indexOf([1, 2, 3], 1, -10)).toBe(0);
  });
  it('handles negative fromIndex exceeding array length', () => {
    expect(_.indexOf([1, 2], 1, -10)).toBe(0);
  });
});

describe('initial', () => {
  it('returns all but last', () => {
    expect(_.initial([1, 2, 3])).toEqual([1, 2]);
  });
  it('returns empty for single element', () => {
    expect(_.initial([1])).toEqual([]);
  });
});

describe('intersection', () => {
  it('returns common values', () => {
    expect(_.intersection([2, 1], [2, 3])).toEqual([2]);
  });
  it('returns empty when no common values', () => {
    expect(_.intersection([1], [2])).toEqual([]);
  });
  it('handles multiple arrays', () => {
    expect(_.intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
  });
  it('handles empty arrays', () => {
    expect(_.intersection([1, 2], [])).toEqual([]);
  });
  it('handles no arguments', () => {
    expect(_.intersection()).toEqual([]);
  });
});

describe('intersectionBy', () => {
  it('finds common values using iteratee', () => {
    expect(_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
  });
  it('works without iteratee (falls back to identity)', () => {
    expect(_.intersectionBy([1, 2], [2, 3] as any)).toEqual([2]);
  });
  it('handles no arguments', () => {
    expect((_.intersectionBy as any)()).toEqual([]);
  });
  it('handles single array', () => {
    expect(_.intersectionBy([1, 2, 3] as any)).toEqual([1, 2, 3]);
  });
  it('handles duplicates in first array', () => {
    expect(_.intersectionBy([1, 1, 2, 2], [1, 2] as any)).toEqual([1, 2]);
  });
});

describe('intersectionWith', () => {
  it('finds common values using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    expect(_.intersectionWith(objects, others, (a: any, b: any) => a.x === b.x && a.y === b.y))
      .toEqual([{ x: 1, y: 2 }]);
  });
  it('uses default comparator when none provided', () => {
    expect(_.intersectionWith([1, 2], [2, 3] as any)).toEqual([2]);
  });
  it('handles duplicates in first array', () => {
    expect(_.intersectionWith([1, 1, 2], [1, 2] as any)).toEqual([1, 2]);
  });
  it('handles no arguments', () => {
    expect((_.intersectionWith as any)()).toEqual([]);
  });
});

describe('join', () => {
  it('joins with separator', () => {
    expect(_.join(['a', 'b', 'c'], '~')).toBe('a~b~c');
  });
  it('defaults to comma', () => {
    expect(_.join([1, 2, 3])).toBe('1,2,3');
  });
  it('handles null/undefined elements', () => {
    expect(_.join([1, null, 3])).toBe('1,,3');
  });
});

describe('last', () => {
  it('returns last element', () => {
    expect(_.last([1, 2, 3])).toBe(3);
  });
  it('returns undefined for empty', () => {
    expect(_.last([])).toBeUndefined();
  });
});

describe('lastIndexOf', () => {
  it('finds last index of value', () => {
    expect(_.lastIndexOf([1, 2, 1, 2], 2)).toBe(3);
  });
  it('respects fromIndex', () => {
    expect(_.lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(1);
  });
  it('handles fromIndex 0', () => {
    expect(_.lastIndexOf([1, 2, 3], 1, 0)).toBe(0);
  });
  it('handles negative fromIndex in lastIndexOf', () => {
    expect(_.lastIndexOf([1, 2, 3], 1, -2)).toBe(0);  // fromIdx=-2 → idx=1, search back: finds 1 at 0
  });
  it('returns -1 when not found', () => {
    expect(_.lastIndexOf([1, 2, 3], 4)).toBe(-1);
  });
  it('returns -1 for empty array', () => {
    expect(_.lastIndexOf([], 1)).toBe(-1);
  });
});

describe('nth', () => {
  it('gets element at index', () => {
    expect(_.nth(['a', 'b', 'c', 'd'], 1)).toBe('b');
  });
  it('supports negative indexing', () => {
    expect(_.nth(['a', 'b', 'c', 'd'], -2)).toBe('c');
  });
  it('defaults to index 0', () => {
    expect(_.nth(['a', 'b', 'c'])).toBe('a');
  });
});

describe('pull', () => {
  it('removes matching values', () => {
    const arr = ['a', 'b', 'c', 'a', 'b', 'c'];
    expect(_.pull(arr, 'a', 'c')).toEqual(['a', 'c', 'a', 'c']);
    expect(arr).toEqual(['b', 'b']);
  });
  it('returns removed values', () => {
    const arr = [1, 2, 3, 1, 2, 3];
    const removed = _.pull(arr, 1, 2);
    expect(removed).toEqual([1, 2, 1, 2]);
  });
});

describe('pullAll', () => {
  it('removes matching values via array', () => {
    const arr = [1, 2, 3, 1, 2, 3];
    const removed = _.pullAll(arr, [1, 2]);
    expect(removed).toEqual([1, 2, 1, 2]);
    expect(arr).toEqual([3, 3]);
  });
  it('handles empty values array', () => {
    const arr = [1, 2, 3];
    expect(_.pullAll(arr, [])).toEqual([]);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('pullAllBy', () => {
  it('removes values matched by iteratee', () => {
    const arr = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
    const removed = _.pullAllBy(arr, [{ x: 1 }, { x: 3 }], (o) => o.x);
    expect(removed).toEqual([{ x: 1 }, { x: 3 }, { x: 1 }]);
    expect(arr).toEqual([{ x: 2 }]);
  });
  it('handles no matches', () => {
    const arr = [{ x: 1 }, { x: 2 }];
    expect(_.pullAllBy(arr, [{ x: 3 }], (o) => o.x)).toEqual([]);
    expect(arr).toEqual([{ x: 1 }, { x: 2 }]);
  });
});

describe('pullAllWith', () => {
  it('removes values matched by comparator', () => {
    const arr = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 4 }];
    const removed = _.pullAllWith(arr, [{ x: 1, y: 2 }, { x: 3, y: 4 }], (a: any, b: any) => a.x === b.x && a.y === b.y);
    expect(removed).toEqual([{ x: 1, y: 2 }, { x: 3, y: 4 }]);
    expect(arr).toEqual([{ x: 2, y: 1 }]);
  });
  it('handles no matches', () => {
    const arr = [{ x: 1 }];
    expect(_.pullAllWith(arr, [{ x: 2 }], (a: any, b: any) => a.x === b.x)).toEqual([]);
    expect(arr).toEqual([{ x: 1 }]);
  });
});

describe('pullAt', () => {
  it('removes and returns at indices', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(_.pullAt(arr, 1, 3)).toEqual(['b', 'd']);
    expect(arr).toEqual(['a', 'c']);
  });
});

describe('remove', () => {
  it('removes elements matching predicate', () => {
    const arr = [1, 2, 3, 4];
    const evens = _.remove(arr, (n) => n % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(arr).toEqual([1, 3]);
  });
});

describe('reverse', () => {
  it('reverses array in place', () => {
    const arr = [1, 2, 3];
    const result = _.reverse(arr);
    expect(result).toEqual([3, 2, 1]);
    expect(result).toBe(arr);
  });
});

describe('slice', () => {
  it('slices from start to end', () => {
    expect(_.slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
  });
  it('supports negative indices', () => {
    expect(_.slice([1, 2, 3, 4], -3, -1)).toEqual([2, 3]);
  });
  it('handles default start/end', () => {
    expect(_.slice([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('sortedIndex', () => {
  it('finds insertion index', () => {
    expect(_.sortedIndex([30, 50], 40)).toBe(1);
  });
  it('returns length for value at end', () => {
    expect(_.sortedIndex([30, 50], 60)).toBe(2);
  });
  it('returns 0 for value at beginning', () => {
    expect(_.sortedIndex([30, 50], 10)).toBe(0);
  });
});

describe('sortedIndexBy', () => {
  it('finds insertion index using iteratee', () => {
    const objects = [{ x: 10 }, { x: 20 }, { x: 30 }];
    expect(_.sortedIndexBy(objects, { x: 25 }, (o) => o.x)).toBe(2);
  });
  it('returns length for value at end', () => {
    const objects = [{ x: 10 }, { x: 20 }];
    expect(_.sortedIndexBy(objects, { x: 30 }, (o) => o.x)).toBe(2);
  });
  it('returns 0 for value at beginning', () => {
    expect(_.sortedIndexBy([{ x: 20 }, { x: 30 }], { x: 10 }, (o) => o.x)).toBe(0);
  });
});

describe('sortedLastIndex', () => {
  it('finds last insertion index with duplicates', () => {
    expect(_.sortedLastIndex([1, 2, 2, 3], 2)).toBe(3);
  });
  it('returns length for value at end', () => {
    expect(_.sortedLastIndex([1, 2, 3], 4)).toBe(3);
  });
  it('returns 0 for value at beginning', () => {
    expect(_.sortedLastIndex([1, 2, 3], 0)).toBe(0);
  });
  it('handles single element array', () => {
    expect(_.sortedLastIndex([1], 1)).toBe(1);
  });
});

describe('sortedLastIndexBy', () => {
  it('finds last insertion index with iteratee', () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 2 }, { x: 3 }];
    expect(_.sortedLastIndexBy(objects, { x: 2 }, (o) => o.x)).toBe(3);
  });
  it('returns length for value at end', () => {
    expect(_.sortedLastIndexBy([{ x: 1 }, { x: 2 }], { x: 3 }, (o) => o.x)).toBe(2);
  });
});

describe('sortedIndexOf', () => {
  it('finds index of value in sorted array', () => {
    expect(_.sortedIndexOf([1, 2, 3, 4], 3)).toBe(2);
  });
  it('returns -1 when value not found', () => {
    expect(_.sortedIndexOf([1, 2, 3, 4], 5)).toBe(-1);
  });
  it('returns -1 for value not in array', () => {
    expect(_.sortedIndexOf([1, 3, 5], 2)).toBe(-1);
  });
});

describe('sortedLastIndexOf', () => {
  it('finds last index of value in sorted array', () => {
    expect(_.sortedLastIndexOf([1, 2, 2, 3], 2)).toBe(2);
  });
  it('returns -1 when value not found', () => {
    expect(_.sortedLastIndexOf([1, 2, 3], 4)).toBe(-1);
  });
  it('handles single occurrence', () => {
    expect(_.sortedLastIndexOf([1, 2, 3], 2)).toBe(1);
  });
});

describe('sortedUniq', () => {
  it('removes duplicates from sorted array', () => {
    expect(_.sortedUniq([1, 1, 2])).toEqual([1, 2]);
  });
  it('handles empty array', () => {
    expect(_.sortedUniq([])).toEqual([]);
  });
  it('handles single element', () => {
    expect(_.sortedUniq([1])).toEqual([1]);
  });
  it('handles all duplicates', () => {
    expect(_.sortedUniq([1, 1, 1])).toEqual([1]);
  });
});

describe('sortedUniqBy', () => {
  it('removes duplicates by iteratee', () => {
    expect(_.sortedUniqBy([1.1, 1.2, 2.1, 2.2], Math.floor)).toEqual([1.1, 2.1]);
  });
  it('handles empty array', () => {
    expect(_.sortedUniqBy([], Math.floor)).toEqual([]);
  });
  it('handles single element', () => {
    expect(_.sortedUniqBy([1.1], Math.floor)).toEqual([1.1]);
  });
});

describe('tail', () => {
  it('returns all but first', () => {
    expect(_.tail([1, 2, 3])).toEqual([2, 3]);
  });
});

describe('take', () => {
  it('takes first n elements', () => {
    expect(_.take([1, 2, 3], 2)).toEqual([1, 2]);
  });
  it('defaults to 1', () => {
    expect(_.take([1, 2, 3])).toEqual([1]);
  });
  it('handles negative n', () => {
    expect(_.take([1, 2, 3], -1)).toEqual([]);
  });
});

describe('takeRight', () => {
  it('takes last n elements', () => {
    expect(_.takeRight([1, 2, 3], 2)).toEqual([2, 3]);
  });
  it('handles negative n', () => {
    expect(_.takeRight([1, 2, 3], -1)).toEqual([]);
  });
  it('handles n=0', () => {
    expect(_.takeRight([1, 2, 3], 0)).toEqual([]);
  });
  it('handles n exceeding length', () => {
    expect(_.takeRight([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });
});

describe('takeWhile', () => {
  it('takes elements while predicate returns truthy', () => {
    expect(_.takeWhile([1, 2, 3, 4], (n) => n < 3)).toEqual([1, 2]);
  });
  it('returns empty when first element fails predicate', () => {
    expect(_.takeWhile([1, 2, 3], (n) => n > 5)).toEqual([]);
  });
  it('returns all when all pass predicate', () => {
    expect(_.takeWhile([1, 2, 3], (n) => n < 10)).toEqual([1, 2, 3]);
  });
  it('handles empty array', () => {
    expect(_.takeWhile([], (_n) => true)).toEqual([]);
  });
});

describe('takeRightWhile', () => {
  it('takes elements from end while predicate returns truthy', () => {
    expect(_.takeRightWhile([1, 2, 3, 4], (n) => n > 2)).toEqual([3, 4]);
  });
  it('returns empty when last element fails predicate', () => {
    expect(_.takeRightWhile([1, 2, 3], (n) => n > 5)).toEqual([]);
  });
  it('returns all when all pass predicate', () => {
    expect(_.takeRightWhile([1, 2, 3], (n) => n < 10)).toEqual([1, 2, 3]);
  });
  it('handles empty array', () => {
    expect(_.takeRightWhile([], (_n) => true)).toEqual([]);
  });
});

describe('union', () => {
  it('returns unique values from all arrays', () => {
    expect(_.union([2], [1, 2])).toEqual([2, 1]);
  });
  it('handles more than two arrays', () => {
    expect(_.union([1], [2], [3], [1, 2])).toEqual([1, 2, 3]);
  });
});

describe('unionBy', () => {
  it('creates unique array using iteratee', () => {
    expect(_.unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });
  it('works without iteratee (identity fallback)', () => {
    expect(_.unionBy([1, 2], [2, 3] as any)).toEqual([1, 2, 3]);
  });
  it('handles empty arrays', () => {
    expect(_.unionBy([], [1, 2], Math.floor)).toEqual([1, 2]);
  });
});

describe('unionWith', () => {
  it('creates unique array using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }];
    expect(_.unionWith(objects, [{ x: 1, y: 3 }], (a: any, b: any) => a.x === b.x))
      .toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
  });
  it('uses default comparator when none provided', () => {
    expect(_.unionWith([1, 2], [2, 3] as any)).toEqual([1, 2, 3]);
  });
});

describe('uniq', () => {
  it('deduplicates array', () => {
    expect(_.uniq([2, 1, 2])).toEqual([2, 1]);
  });
  it('handles NaN correctly', () => {
    expect(_.uniq([NaN, 2, NaN])).toEqual([NaN, 2]);
  });
  it('handles empty array', () => {
    expect(_.uniq([])).toEqual([]);
  });
  it('handles single element', () => {
    expect(_.uniq([1])).toEqual([1]);
  });
});

describe('uniqBy', () => {
  it('deduplicates by iteratee', () => {
    expect(_.uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });
});

describe('uniqWith', () => {
  it('deduplicates using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }];
    expect(_.uniqWith(objects, (a: any, b: any) => a.x === b.x && a.y === b.y))
      .toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
  });
  it('handles all unique', () => {
    expect(_.uniqWith([1, 2, 3], (a, b) => a === b)).toEqual([1, 2, 3]);
  });
  it('handles empty array', () => {
    expect(_.uniqWith([], (a, b) => a === b)).toEqual([]);
  });
});

describe('unzip', () => {
  it('ungroups zipped array', () => {
    expect(_.unzip([['a', 1, true], ['b', 2, false]])).toEqual([['a', 'b'], [1, 2], [true, false]]);
  });
  it('handles empty array', () => {
    expect(_.unzip([])).toEqual([]);
  });
});

describe('unzipWith', () => {
  it('ungroups with iteratee', () => {
    const zipped = [[1, 10, 100], [2, 20, 200]];
    expect(_.unzipWith(zipped, (...args: number[]) => args.reduce((a, b) => a + b, 0))).toEqual([3, 30, 300]);
  });
  it('handles empty array', () => {
    expect(_.unzipWith([], (..._args: number[]) => 0)).toEqual([]);
  });
});

describe('without', () => {
  it('excludes specified values', () => {
    expect(_.without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  });
});

describe('xor', () => {
  it('returns symmetric difference', () => {
    expect(_.xor([2, 1], [2, 3])).toEqual([1, 3]);
  });
  it('handles more than two arrays', () => {
    expect(_.xor([1, 2], [2, 3], [3, 4])).toEqual([1, 4]);
  });
});

describe('xorBy', () => {
  it('computes symmetric difference using iteratee', () => {
    expect(_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2, 3.4]);
  });
  it('works without iteratee (identity fallback)', () => {
    expect(_.xorBy([1, 2], [2, 3] as any)).toEqual([1, 3]);
  });
});

describe('xorWith', () => {
  it('computes symmetric difference using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    expect(_.xorWith(objects, others, (a: any, b: any) => a.x === b.x && a.y === b.y))
      .toEqual([{ x: 2, y: 1 }, { x: 1, y: 1 }]);
  });
  it('uses default comparator when none provided', () => {
    expect(_.xorWith([1, 2], [2, 3] as any)).toEqual([1, 3]);
  });
  it('handles items that match by comparator but are not identical', () => {
    const a = { id: 1 };
    const b = { id: 1 };
    const c = { id: 2 };
    expect(_.xorWith([a, b], [c], (x: any, y: any) => x.id === y.id)).toEqual([c]);
  });
});

describe('zip', () => {
  it('groups elements by index', () => {
    expect(_.zip(['a', 'b'] as any, [1, 2] as any, [true, false] as any)).toEqual([['a', 1, true], ['b', 2, false]]);
  });
});

describe('zipObject', () => {
  it('creates object from keys/values', () => {
    expect(_.zipObject(['a', 'b'], [1, 2])).toEqual({ a: 1, b: 2 });
  });
  it('blocks prototype pollution', () => {
    _.zipObject(['__proto__', 'b'] as any, ['polluted', 2]);
    expect(({} as any).polluted).toBeUndefined();
  });
  it('handles more keys than values', () => {
    const obj = _.zipObject(['a', 'b', 'c'], [1, 2]);
    expect(obj).toEqual({ a: 1, b: 2, c: undefined });
  });
});

describe('zipObjectDeep', () => {
  it('creates nested object from dot paths', () => {
    expect(_.zipObjectDeep(['a.b.c', 'd.e'], [1, 2])).toEqual({ a: { b: { c: 1 } }, d: { e: 2 } });
  });
  it('creates arrays for numeric path segments', () => {
    expect(_.zipObjectDeep(['0.a', '1.b'], ['x', 'y'])).toEqual({ 0: { a: 'x' }, 1: { b: 'y' } });
  });
  it('blocks prototype pollution paths', () => {
    const result = _.zipObjectDeep(['__proto__.polluted', 'constructor.x'], ['yes', 'no']);
    expect(result).toEqual({});
    expect(({} as any).polluted).toBeUndefined();
  });
  it('handles bracket notation paths', () => {
    expect(_.zipObjectDeep(['a[0].b', 'a[1].c'], ['x', 'y'])).toEqual({ a: [undefined, { c: 'y' }] });
  });
  it('handles missing values', () => {
    expect(_.zipObjectDeep(['a.b'], [])).toEqual({ a: { b: undefined } });
  });
});

describe('zipWith', () => {
  it('zips with iteratee', () => {
    expect(_.zipWith([1, 2], [10, 20], [100, 200], (...args: number[]) => args.reduce((a, b) => a + b, 0)))
      .toEqual([111, 222]);
  });
  it('zips with single array and iteratee', () => {
    expect(_.zipWith([1, 2, 3], (n: number) => n * 2)).toEqual([2, 4, 6]);
  });
  it('zips with multiple arrays and reduce iteratee', () => {
    expect(_.zipWith([1, 2], [10, 20], (a: number, b: number) => a + b)).toEqual([11, 22]);
  });
});
