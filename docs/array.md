# Array

65 functions for array manipulation.

| Function | Description | Example |
|----------|-------------|---------|
| `chunk(array, size)` | Split into groups of `size` | `chunk(['a','b','c','d'], 2)` → `[['a','b'],['c','d']]` |
| `compact(array)` | Remove falsy values | `compact([0, 1, false, 2])` → `[1, 2]` |
| `concat(array, ...values)` | Concatenate arrays/values | `concat([1], 2, [3])` → `[1, 2, 3]` |
| `difference(array, ...values)` | Values not in exclusion arrays | `difference([2, 1, 3], [2, 3])` → `[1]` |
| `differenceBy(array, ...args)` | Difference using iteratee | `differenceBy([2.1, 1.2], [2.3], Math.floor)` → `[1.2]` |
| `differenceWith(array, ...args)` | Difference using comparator | `differenceWith([{x:1}], [{x:1}], (a,b) => a.x===b.x)` → `[]` |
| `drop(array, n=1)` | Drop first n elements | `drop([1, 2, 3], 2)` → `[3]` |
| `dropRight(array, n=1)` | Drop last n elements | `dropRight([1, 2, 3], 2)` → `[1]` |
| `dropWhile(array, predicate)` | Drop from start while predicate | `dropWhile([1,2,3], n => n < 3)` → `[3]` |
| `dropRightWhile(array, predicate)` | Drop from end while predicate | `dropRightWhile([1,2,3], n => n > 1)` → `[1]` |
| `fill(array, value, start, end)` | Fill elements with value | `fill([1,2,3], 'a', 1, 3)` → `[1,'a','a']` |
| `findIndex(array, predicate, fromIndex)` | Find index passing predicate | `findIndex([1,2,3], n => n%2===0)` → `1` |
| `findLastIndex(array, predicate, fromIndex)` | Find index from right | `findLastIndex([1,2,3,4], n => n%2===0)` → `3` |
| `first(array)` | First element (alias for `head`) | `first([1, 2, 3])` → `1` |
| `flatten(array)` | Flatten one level | `flatten([1, [2, [3]]])` → `[1, 2, [3]]` |
| `flattenDeep(array)` | Recursively flatten | `flattenDeep([1, [2, [3]]])` → `[1, 2, 3]` |
| `flattenDepth(array, depth)` | Flatten to depth | `flattenDepth([1, [2, [3]]], 1)` → `[1, 2, [3]]` |
| `fromPairs(pairs)` | Pairs to object | `fromPairs([['a',1],['b',2]])` → `{a:1, b:2}` |
| `head(array)` | First element | `head([1, 2, 3])` → `1` |
| `indexOf(array, value, fromIndex)` | Find first index | `indexOf([1,2,1,2], 2)` → `1` |
| `initial(array)` | All but last | `initial([1, 2, 3])` → `[1, 2]` |
| `intersection(...arrays)` | Values in all arrays | `intersection([2,1], [2,3])` → `[2]` |
| `intersectionBy(...args)` | Intersection with iteratee | `intersectionBy([2.1,1.2], [2.3], Math.floor)` → `[2.1]` |
| `intersectionWith(...args)` | Intersection with comparator | — |
| `join(array, separator)` | Join with separator | `join(['a','b','c'], '~')` → `'a~b~c'` |
| `last(array)` | Last element | `last([1, 2, 3])` → `3` |
| `lastIndexOf(array, value, fromIndex)` | Find last index | `lastIndexOf([1,2,1,2], 2)` → `3` |
| `nth(array, n)` | Element at index (supports negative) | `nth(['a','b','c','d'], -2)` → `'c'` |
| `pull(array, ...values)` | Remove matching values (mutates) | `pull([1,2,3,1,2,3], 1, 2)` → `[3,3]` |
| `pullAll(array, values)` | Remove all matching | — |
| `pullAllBy(array, values, iteratee)` | Pull by iteratee | — |
| `pullAllWith(array, values, comparator)` | Pull by comparator | — |
| `pullAt(array, ...indexes)` | Remove at indexes | `pullAt(['a','b','c','d'], 1, 3)` → `['b','d']` |
| `remove(array, predicate)` | Remove matching (mutates) | `remove([1,2,3,4], n => n%2===0)` → `[2,4]` |
| `reverse(array)` | Reverse in place | `reverse([1,2,3])` → `[3,2,1]` |
| `slice(array, start, end)` | Slice array | `slice([1,2,3,4], 1, 3)` → `[2,3]` |
| `sortedIndex(array, value)` | Binary search insertion index | `sortedIndex([30,50], 40)` → `1` |
| `sortedIndexBy(array, value, iteratee)` | Sorted index by iteratee | — |
| `sortedIndexOf(array, value)` | Index of in sorted array | `sortedIndexOf([10,20,30], 20)` → `1` |
| `sortedLastIndex(array, value)` | Last insertion index | `sortedLastIndex([10,20,20,30], 20)` → `3` |
| `sortedLastIndexBy(array, value, iteratee)` | Last index by iteratee | — |
| `sortedLastIndexOf(array, value)` | Last occurrence index | `sortedLastIndexOf([10,20,20,30], 20)` → `2` |
| `sortedUniq(array)` | Deduplicate sorted | `sortedUniq([1,1,2])` → `[1,2]` |
| `sortedUniqBy(array, iteratee)` | Sorted uniq by iteratee | — |
| `tail(array)` | All but first | `tail([1, 2, 3])` → `[2, 3]` |
| `take(array, n)` | Take first n | `take([1, 2, 3], 2)` → `[1, 2]` |
| `takeRight(array, n)` | Take last n | `takeRight([1, 2, 3], 2)` → `[2, 3]` |
| `takeWhile(array, predicate)` | Take from start while predicate | `takeWhile([1,2,3,4], n => n < 3)` → `[1,2]` |
| `takeRightWhile(array, predicate)` | Take from end while predicate | `takeRightWhile([1,2,3,4], n => n > 2)` → `[3,4]` |
| `union(...arrays)` | Unique values across arrays | `union([2], [1, 2])` → `[2, 1]` |
| `unionBy(...args)` | Union with iteratee | — |
| `unionWith(...args)` | Union with comparator | — |
| `uniq(array)` | Deduplicate | `uniq([2, 1, 2])` → `[2, 1]` |
| `uniqBy(array, iteratee)` | Unique by iteratee | `uniqBy([2.1, 1.2, 2.3], Math.floor)` → `[2.1, 1.2]` |
| `uniqWith(array, comparator)` | Unique with comparator | — |
| `unzip(array)` | Ungroup zipped arrays | `unzip([['a',1],['b',2]])` → `[['a','b'],[1,2]]` |
| `unzipWith(array, iteratee)` | Unzip with iteratee | — |
| `without(array, ...values)` | Exclude values | `without([2,1,2,3], 1, 2)` → `[3]` |
| `xor(...arrays)` | Symmetric difference | `xor([2,1], [2,3])` → `[1,3]` |
| `xorBy(...args)` | Xor with iteratee | — |
| `xorWith(...args)` | Xor with comparator | — |
| `zip(...arrays)` | Group by index | `zip(['a','b'], [1,2])` → `[['a',1],['b',2]]` |
| `zipObject(props, values)` | Keys/values to object | `zipObject(['a','b'], [1,2])` → `{a:1, b:2}` |
| `zipObjectDeep(paths, values)` | Deep paths to object | `zipObjectDeep(['a.b.c'], [1])` → `{a:{b:{c:1}}}` |
| `zipWith(...args)` | Zip with iteratee | — |
