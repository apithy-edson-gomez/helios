# Helios ☀️

**High-efficiency, security-hardened Lodash alternative.**

Zero dependencies. Fully tree-shakeable. 231 utility functions covering Array, Collection, Function, Lang, Math, Object, String, and Util categories.

```bash
npm install @apithy-edson-gomez/helios
```

📖 **Documentation**: [`docs/`](docs/) — [Overview](docs/v1.0/overview) · [Array](docs/v1.0/Array) · [Collection](docs/v1.0/Collection) · [Function](docs/v1.0/Function) · [Lang](docs/v1.0/Lang) · [Math](docs/v1.0/Math) · [Object](docs/v1.0/Object) · [String](docs/v1.0/String) · [Util](docs/v1.0/Util) · [Security](docs/v1.0/Security)

## Why Helios?

- **🔒 Security-first** — All functions block `__proto__`, `prototype`, and `constructor` pollution at every entry point. `sanitizePath()` and `safeGet()` prevent prototype traversal.
- **⚡ Performance** — Simple `for` loops (no `.map`/`.filter`/`.reduce` in implementations). Minimal allocations. Lazy `Set`/`Map` caches where appropriate.
- **🛡️ Zero dependencies** — The entire library is self-contained TypeScript.
- **📦 Tree-shakeable** — Import only what you use: `import { chunk, isEqual } from 'helios'`
- **🎯 TypeScript native** — Full type declarations included.

## Quick Start

```typescript
import { chunk, isEqual, debounce, get, set, uniq, orderBy } from 'helios';

// Array
chunk(['a', 'b', 'c', 'd'], 2);  // [['a','b'], ['c','d']]
uniq([2, 1, 2]);                  // [2, 1]

// Lang
isEqual({ a: { b: 1 } }, { a: { b: 1 } });  // true

// Object
const obj = {};
set(obj, 'a.b.c', 42);
get(obj, 'a.b.c');  // 42

// Function
const fn = debounce(() => console.log('hi'), 300);

// Collection
orderBy(users, ['user', 'age'], ['asc', 'desc']);

// Security — built-in
import { sanitizePath, safeGet } from 'helios';

sanitizePath('__proto__');  // throws SecurityError
safeGet({}, '__proto__');   // throws SecurityError
```

## API Coverage

### Array (50 functions)
`chunk`, `compact`, `concat`, `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropWhile`, `dropRightWhile`, `fill`, `findIndex`, `findLastIndex`, `first`, `flatten`, `flattenDeep`, `flattenDepth`, `fromPairs`, `head`, `indexOf`, `initial`, `intersection`, `intersectionBy`, `intersectionWith`, `join`, `last`, `lastIndexOf`, `nth`, `pull`, `pullAll`, `pullAllBy`, `pullAllWith`, `pullAt`, `remove`, `reverse`, `slice`, `sortedIndex`, `sortedIndexBy`, `sortedIndexOf`, `sortedLastIndex`, `sortedLastIndexBy`, `sortedLastIndexOf`, `sortedUniq`, `sortedUniqBy`, `tail`, `take`, `takeRight`, `takeWhile`, `takeRightWhile`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unzip`, `unzipWith`, `without`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`, `zipObjectDeep`, `zipWith`

### Collection (25 functions)
`countBy`, `every`, `filter`, `find`, `findLast`, `flatMap`, `flatMapDeep`, `flatMapDepth`, `forEach`, `forEachRight`, `groupBy`, `includes`, `invokeMap`, `keyBy`, `map`, `orderBy`, `partition`, `reduce`, `reject`, `sample`, `sampleSize`, `shuffle`, `size`, `some`, `sortBy`

### Function (19 functions)
`after`, `before`, `bind`, `curry`, `debounce`, `defer`, `delay`, `flip`, `memoize`, `negate`, `once`, `overArgs`, `partial`, `partialRight`, `rest`, `spread`, `throttle`, `unary`, `wrap`

### Lang (41 functions)
`clone`, `cloneDeep`, `eq`, `isArguments`, `isArray`, `isArrayBuffer`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isError`, `isEqual`, `isEqualWith`, `isFunction`, `isInteger`, `isLength`, `isMap`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`, `isSet`, `isString`, `isSymbol`, `isTypedArray`, `isUndefined`, `isWeakMap`, `isWeakSet`, `toArray`, `toFinite`, `toInteger`, `toLength`, `toNumber`, `toPlainObject`, `toString`

### Math (15 functions)
`add`, `ceil`, `divide`, `floor`, `max`, `maxBy`, `mean`, `meanBy`, `min`, `minBy`, `multiply`, `round`, `subtract`, `sum`, `sumBy`

### Object (20 functions)
`at`, `get`, `has`, `invert`, `invertBy`, `keys`, `mapKeys`, `mapValues`, `merge`, `omit`, `omitBy`, `pick`, `pickBy`, `result`, `set`, `toPairs`, `toPairsIn`, `transform`, `values`, `valuesIn`

### String (29 functions)
`camelCase`, `capitalize`, `deburr`, `endsWith`, `escape`, `escapeRegExp`, `kebabCase`, `lowerCase`, `lowerFirst`, `pad`, `padEnd`, `padStart`, `parseInt`, `repeat`, `replace`, `snakeCase`, `split`, `startCase`, `startsWith`, `toLower`, `toUpper`, `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `upperCase`, `upperFirst`, `words`

### Util (12 functions)
`constant`, `identity`, `iteratee`, `matches`, `matchesProperty`, `noop`, `property`, `propertyOf`, `range`, `rangeRight`, `times`, `uniqueId`

### Security (5 functions)
`sanitizePath`, `deepFreeze`, `safeClone`, `safeGet`, `isPlainObject`

## Security Design

Helios was built from the ground up to prevent prototype pollution attacks:

- **Path validation** — `sanitizePath()` blocks `__proto__`, `prototype`, `constructor` at every entry
- **Safe property access** — All internal property access uses `Object.prototype.hasOwnProperty.call()`
- **Output filtering** — `merge`, `set`, `fromPairs`, `zipObject`, `invert` all filter dangerous keys from output objects
- **Deep freeze** — `deepFreeze()` recursively freezes objects for immutable configurations
- **Safe clone** — `safeClone()` uses `structuredClone` with fallback

## Performance Notes

Identical API to Lodash 4.18.1, but with more efficient internals:
- `uniq` uses `Set` (O(n)) instead of nested loops (O(n²))
- `difference` uses `Set` lookup (O(n+m))
- `union` deduplicates in a single pass
- `pull` uses write-pointer pattern (O(n), single pass)
- `sortedIndex` / `sortedLastIndex` use binary search (O(log n))
- `throttle`/`debounce` have minimal timer overhead
- No unnecessary object allocations in hot paths

## License

MIT
