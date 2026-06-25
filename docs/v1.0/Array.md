# Helios v1.0 — Array

The Array module provides 65 functions for working with arrays. Every function is immutable where applicable and safe against prototype pollution.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `chunk` | Splits an array into groups of the specified size | `chunk(['a', 'b', 'c', 'd'], 2)` → `[['a', 'b'], ['c', 'd']]` |
| `compact` | Removes falsy values (`false`, `null`, `0`, `""`, `undefined`, `NaN`) | `compact([0, 1, false, 2, '', 3])` → `[1, 2, 3]` |
| `concat` | Concatenates arrays/values into a new array | `concat([1], 2, [3])` → `[1, 2, 3]` |
| `difference` | Returns values in the first array not present in the second | `difference([2, 1], [2, 3])` → `[1]` |
| `differenceBy` | Like `difference` but uses an iteratee to compare | `differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)` → `[1.2]` |
| `differenceWith` | Like `difference` but uses a custom comparator | `differenceWith([{x:2},{x:1}],[{x:2}],(a,b)=>a.x===b.x)` → `[{x:1}]` |
| `drop` | Removes the first n elements (default 1) | `drop([1, 2, 3], 2)` → `[3]` |
| `dropRight` | Removes the last n elements | `dropRight([1, 2, 3], 2)` → `[1]` |
| `dropWhile` | Drops elements from the start while the predicate returns truthy | `dropWhile([1,2,3,4], n => n < 3)` → `[3, 4]` |
| `dropRightWhile` | Drops elements from the end while the predicate returns truthy | `dropRightWhile([1,2,3,4], n => n > 2)` → `[1, 2]` |
| `fill` | Fills elements of an array with a value from start to end | `fill([1,2,3], '*', 1, 3)` → `[1, '*', '*']` |
| `findIndex` | Returns the index of the first element matching the predicate | `findIndex([4,6,8,10], n => n > 7)` → `2` |
| `findLastIndex` | Returns the index of the last element matching the predicate | `findLastIndex([4,6,8,10], n => n > 7)` → `3` |
| `first` | Returns the first element of an array | `first([1, 2, 3])` → `1` |
| `flatten` | Flattens one level of nesting | `flatten([1, [2, [3]]])` → `[1, 2, [3]]` |
| `flattenDeep` | Recursively flattens all nesting | `flattenDeep([1, [2, [3]]])` → `[1, 2, 3]` |
| `flattenDepth` | Flattens up to the specified depth | `flattenDepth([1, [2, [3]]], 1)` → `[1, 2, [3]]` |
| `fromPairs` | Converts an array of key-value pairs into an object | `fromPairs([['a',1],['b',2]])` → `{a:1, b:2}` |
| `head` | Alias for `first` | `head([1, 2, 3])` → `1` |
| `indexOf` | Returns the first index of a value using SameValueZero | `indexOf([1, 2, 3, 2], 2)` → `1` |
| `initial` | Returns all elements except the last | `initial([1, 2, 3])` → `[1, 2]` |
| `intersection` | Returns values present in all given arrays | `intersection([2,1],[2,3])` → `[2]` |
| `intersectionBy` | Like `intersection` but uses an iteratee | `intersectionBy([2.1,1.2],[2.3,3.4], Math.floor)` → `[2.1]` |
| `intersectionWith` | Like `intersection` but uses a custom comparator | `intersectionWith([{x:2}],[{x:2}],(a,b)=>a.x===b.x)` → `[{x:2}]` |
| `join` | Joins array elements into a string with a separator | `join(['a','b','c'], '~')` → `'a~b~c'` |
| `last` | Returns the last element of an array | `last([1, 2, 3])` → `3` |
| `lastIndexOf` | Returns the last index of a value | `lastIndexOf([1, 2, 3, 2], 2)` → `3` |
| `nth` | Returns the element at index n (supports negative) | `nth(['a','b','c'], -1)` → `'c'` |
| `pull` | Removes all given values from the array (mutates) | `pull([1,2,3,1,2], 1, 2)` → `[3]` |
| `pullAll` | Like `pull` but accepts an array of values | `pullAll([1,2,3,1,2],[1,2])` → `[3]` |
| `pullAllBy` | Like `pullAll` but uses an iteratee | `pullAllBy([2.1,1.2],[2.3], Math.floor)` → `[1.2]` |
| `pullAllWith` | Like `pullAll` but uses a custom comparator | `pullAllWith([{x:2},{x:1}],[{x:2}],(a,b)=>a.x===b.x)` → `[{x:1}]` |
| `pullAt` | Removes and returns elements at specified indices | `pullAt([5,6,7,8], [1,3])` → `[6, 8]`, original is `[5, 7]` |
| `remove` | Removes elements matching the predicate (mutates) | `remove([1,2,3,4], n => n % 2 === 0)` → `[2, 4]`, original is `[1, 3]` |
| `reverse` | Reverses an array (mutates) | `reverse([1, 2, 3])` → `[3, 2, 1]` |
| `slice` | Returns a slice of an array from start to end | `slice([1,2,3,4], 1, 3)` → `[2, 3]` |
| `sortedIndex` | Returns the lowest index to insert value maintaining sort order | `sortedIndex([30, 50], 40)` → `1` |
| `sortedIndexBy` | Like `sortedIndex` but uses an iteratee | `sortedIndexBy([{x:30},{x:50}], {x:40}, o => o.x)` → `1` |
| `sortedIndexOf` | Like `indexOf` but for sorted arrays (binary search) | `sortedIndexOf([10,20,30,40], 30)` → `2` |
| `sortedLastIndex` | Returns the highest index to insert value maintaining sort | `sortedLastIndex([30, 40, 50], 40)` → `2` |
| `sortedLastIndexBy` | Like `sortedLastIndex` but uses an iteratee | `sortedLastIndexBy([{x:30},{x:40}], {x:40}, o => o.x)` → `2` |
| `sortedLastIndexOf` | Like `lastIndexOf` but for sorted arrays (binary search) | `sortedLastIndexOf([10,20,30,30,40], 30)` → `3` |
| `sortedUniq` | Returns unique values from a sorted array | `sortedUniq([1,1,2,2,3])` → `[1, 2, 3]` |
| `sortedUniqBy` | Like `sortedUniq` but uses an iteratee | `sortedUniqBy([1.1,1.2,2.1], Math.floor)` → `[1.1, 2.1]` |
| `tail` | Returns all elements except the first | `tail([1, 2, 3])` → `[2, 3]` |
| `take` | Returns the first n elements | `take([1, 2, 3], 2)` → `[1, 2]` |
| `takeRight` | Returns the last n elements | `takeRight([1, 2, 3], 2)` → `[2, 3]` |
| `takeWhile` | Takes elements from the start while the predicate is truthy | `takeWhile([1,2,3,4], n => n < 3)` → `[1, 2]` |
| `takeRightWhile` | Takes elements from the end while the predicate is truthy | `takeRightWhile([1,2,3,4], n => n > 2)` → `[3, 4]` |
| `union` | Returns the union of arrays (unique values, order preserved) | `union([2], [1, 2])` → `[2, 1]` |
| `unionBy` | Like `union` but uses an iteratee | `unionBy([2.1],[1.2,2.3], Math.floor)` → `[2.1, 1.2]` |
| `unionWith` | Like `union` but uses a custom comparator | `unionWith([{x:1}],[{x:1},{x:2}],(a,b)=>a.x===b.x)` → `[{x:1},{x:2}]` |
| `uniq` | Returns unique values (order preserved) | `uniq([2, 1, 2])` → `[2, 1]` |
| `uniqBy` | Like `uniq` but uses an iteratee | `uniqBy([2.1, 1.2, 2.3], Math.floor)` → `[2.1, 1.2]` |
| `uniqWith` | Like `uniq` but uses a custom comparator | `uniqWith([{x:1},{x:2},{x:1}],(a,b)=>a.x===b.x)` → `[{x:1},{x:2}]` |
| `unzip` | Groups arrays' elements by index (reverse of zip) | `unzip([['a',1],[['b',2]]])` → `[['a','b'],[1,2]]` |
| `unzipWith` | Like `unzip` but uses an iteratee on the grouped values | `unzipWith([[1,10],[2,20]], Math.max)` → `[2, 20]` |
| `without` | Returns an array excluding the given values | `without([2, 1, 2, 3], 1, 2)` → `[3]` |
| `xor` | Returns the symmetric difference of arrays | `xor([2, 1], [2, 3])` → `[1, 3]` |
| `xorBy` | Like `xor` but uses an iteratee | `xorBy([2.1,1.2],[2.3,3.4], Math.floor)` → `[1.2, 3.4]` |
| `xorWith` | Like `xor` but uses a custom comparator | `xorWith([{x:1}],[{x:2},{x:1}],(a,b)=>a.x===b.x)` → `[{x:2}]` |
| `zip` | Groups arrays' elements by index (like Python zip) | `zip(['a','b'], [1,2], [true,false])` → `[['a',1,true],['b',2,false]]` |
| `zipObject` | Creates an object from arrays of keys and values | `zipObject(['a','b'],[1,2])` → `{a:1, b:2}` |
| `zipObjectDeep` | Like `zipObject` but supports nested property paths | `zipObjectDeep(['a.b.c'],[1])` → `{a:{b:{c:1}}}` |
| `zipWith` | Like `zip` but uses an iteratee on the grouped values | `zipWith([1,2],[10,20], (a,b) => a + b)` → `[11, 22]` |

---

## Notes

- **Mutating functions**: `pull`, `pullAll`, `pullAllBy`, `pullAllWith`, `pullAt`, `remove`, and `reverse` mutate the original array. All other functions return new arrays.
- **Iteratee shorthand**: Functions with a `By` suffix accept iteratees in string shorthand (property name), object shorthand (partial matcher), or function form. See [Util → iteratee](Util) for details.
- **Security**: All path-based array operations are protected against prototype pollution.

[← Back to Overview](overview)
