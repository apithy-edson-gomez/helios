# Collection

25 functions for iterating, filtering, and transforming collections (arrays, objects, strings, Map, Set).

| Function | Description | Example |
|----------|-------------|---------|
| `countBy(collection, iteratee)` | Group counts by iteratee | `countBy([6.1, 4.2, 6.3], Math.floor)` → `{'4': 1, '6': 2}` |
| `forEach(collection, iteratee)` | Iterate over collection | `forEach({a:1, b:2}, (v, k) => ...)` |
| `forEachRight(collection, iteratee)` | Iterate right-to-left | — |
| `every(collection, predicate)` | Check all pass | `every([true, 1, 'yes'], Boolean)` → `true` |
| `filter(collection, predicate)` | Filter matching | `filter([1,2,3,4], n => n%2===0)` → `[2,4]` |
| `find(collection, predicate, fromIndex)` | First matching element | `find([1,2,3,4], n => n%2===0)` → `2` |
| `findLast(collection, predicate, fromIndex)` | Last matching element | `findLast([1,2,3,4], n => n%2===0)` → `4` |
| `flatMap(collection, iteratee)` | Map then flatten 1 level | `flatMap([1,2], n => [n,n])` → `[1,1,2,2]` |
| `flatMapDeep(collection, iteratee)` | Map then flatten deep | `flatMapDeep([1,2], n => [[n]])` → `[1,2]` |
| `flatMapDepth(collection, iteratee, depth)` | Map then flatten to depth | — |
| `groupBy(collection, iteratee)` | Group by key | `groupBy([6.1, 4.2, 6.3], Math.floor)` → `{'4':[4.2],'6':[6.1,6.3]}` |
| `includes(collection, value, fromIndex)` | Check if contains | `includes([1,2,3], 1)` → `true` |
| `invokeMap(collection, path, ...args)` | Invoke method on each | `invokeMap([['a','b'],['c','d']], 'join', '~')` → `['a~b','c~d']` |
| `keyBy(collection, iteratee)` | Key by property | `keyBy([{id:'a'}], o => o.id)` → `{a: {id:'a'}}` |
| `map(collection, iteratee)` | Transform collection | `map([1,2,3], n => n*2)` → `[2,4,6]` |
| `orderBy(collection, iteratees, orders)` | Multi-key sort | `orderBy(users, ['user','age'], ['asc','desc'])` |
| `partition(collection, predicate)` | Split into truthy/falsy | `partition([1,0,2,''], Boolean)` → `[[1,2], [0,'']]` |
| `reduce(collection, iteratee, accumulator)` | Reduce to single value | `reduce([1,2,3], (a,n) => a+n, 0)` → `6` |
| `reject(collection, predicate)` | Opposite of filter | `reject([1,2,3,4], n => n%2===0)` → `[1,3]` |
| `sample(collection)` | Random element | `sample([1,2,3])` → `2` (random) |
| `sampleSize(collection, n)` | N random elements | `sampleSize([1,2,3,4,5], 3)` → `[2,4,1]` (random) |
| `shuffle(collection)` | Fisher-Yates shuffle | `shuffle([1,2,3,4])` → `[3,1,4,2]` |
| `size(collection)` | Collection length | `size({a:1, b:2})` → `2` |
| `some(collection, predicate)` | Check any pass | `some([null, 0, 'yes'], Boolean)` → `true` |
| `sortBy(collection, iteratees)` | Sort ascending | `sortBy([3,1,2])` → `[1,2,3]` |
