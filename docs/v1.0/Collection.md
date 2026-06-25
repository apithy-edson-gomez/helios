# Helios v1.0 — Collection

The Collection module provides 25 functions for iterating, filtering, transforming, and querying arrays and objects. These functions work on both arrays and array-like objects.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `countBy` | Counts occurrences of values grouped by an iteratee | `countBy([6.1, 4.2, 6.3], Math.floor)` → `{'4':1, '6':2}` |
| `forEach` | Iterates over elements, invoking the iteratee for each | `forEach([1, 2], (v, i) => console.log(v, i))` |
| `forEachRight` | Like `forEach` but iterates from right to left | `forEachRight([1, 2], (v, i) => console.log(v, i))` |
| `every` | Checks if the predicate returns truthy for **all** elements | `every([true, false, true], Boolean)` → `false` |
| `filter` | Returns elements where the predicate returns truthy | `filter([1, 2, 3, 4], n => n % 2 === 0)` → `[2, 4]` |
| `find` | Returns the first element matching the predicate | `find([1, 2, 3, 4], n => n % 2 === 0)` → `2` |
| `findLast` | Returns the last element matching the predicate | `findLast([1, 2, 3, 4], n => n % 2 === 0)` → `4` |
| `flatMap` | Maps each element then flattens the result one level | `flatMap([1, 2], n => [n, n])` → `[1, 1, 2, 2]` |
| `flatMapDeep` | Maps each element then recursively flattens | `flatMapDeep([1,2], n => [[n,n]])` → `[1, 1, 2, 2]` |
| `flatMapDepth` | Maps each element then flattens to a given depth | `flatMapDepth([1,2], n => [[n]], 1)` → `[[1], [2]]` |
| `groupBy` | Groups elements by the result of the iteratee | `groupBy([6.1, 4.2, 6.3], Math.floor)` → `{'4':[4.2], '6':[6.1,6.3]}` |
| `includes` | Checks if a value is in the collection (SameValueZero) | `includes([1, 2, 3], 2)` → `true` |
| `invokeMap` | Invokes a method on each element in the collection | `invokeMap([[5,1,7],[3,2,1]], 'sort')` → `[[1,5,7],[1,2,3]]` |
| `keyBy` | Creates an object indexed by the iteratee result | `keyBy([{id:'a'},{id:'b'}], 'id')` → `{a:{id:'a'}, b:{id:'b'}}` |
| `map` | Transforms each element via the iteratee | `map([1, 2, 3], n => n * 2)` → `[2, 4, 6]` |
| `orderBy` | Like `sortBy` but supports sort direction per criterion | `orderBy([{x:2},{x:1}], ['x'], ['desc'])` → `[{x:2},{x:1}]` |
| `partition` | Splits elements into two groups (truthy/falsy) | `partition([1,2,3,4], n => n % 2 === 0)` → `[[2,4],[1,3]]` |
| `reduce` | Reduces the collection to a single value (left-to-right) | `reduce([1,2,3], (acc, n) => acc + n, 0)` → `6` |
| `reject` | The opposite of `filter` — removes matching elements | `reject([1,2,3,4], n => n % 2 === 0)` → `[1, 3]` |
| `sample` | Returns a random element from the collection | `sample([1, 2, 3, 4])` → `3` (random) |
| `sampleSize` | Returns n random elements (without replacement) | `sampleSize([1,2,3,4], 2)` → `[4, 1]` (random) |
| `shuffle` | Returns a new array with elements in random order | `shuffle([1, 2, 3, 4])` → `[3, 1, 4, 2]` (random) |
| `size` | Returns the number of elements or own enumerable keys | `size({a:1,b:2})` → `2`, `size('hello')` → `5` |
| `some` | Checks if the predicate returns truthy for **any** element | `some([false, null, true], Boolean)` → `true` |
| `sortBy` | Creates a stable-sorted array using the iteratee | `sortBy([{x:2},{x:1}], 'x')` → `[{x:1},{x:2}]` |

---

## Notes

- **Iteratee shorthand**: All collection functions that accept an iteratee support property-name strings, object partial matchers, and function callbacks. See [Util → iteratee](Util).
- **Collection compatibility**: These functions work on arrays, array-like objects (`arguments`, `NodeList`), and plain objects with enumerable properties.
- **Stability**: `sortBy` and `orderBy` use stable sorting (equal elements retain original order).

[← Back to Overview](overview)
