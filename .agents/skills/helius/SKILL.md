---
name: helius
description: How to use the Helios library in downstream projects — installation, imports, common patterns, security features.
---

# Helius Skill — Using Helios

> High-efficiency, security-hardened Lodash alternative.
> 231 functions, zero dependencies, 43 KB.

## Installation

```bash
npm install @apithy-edson-gomez/helios
```

## Import patterns

```typescript
// Named imports (tree-shakeable — recommended)
import { chunk, isEqual, debounce } from '@apithy-edson-gomez/helios';

// Single import for many functions
import * as h from '@apithy-edson-gomez/helios';
h.chunk([1,2,3,4], 2);
h.isEqual({a:1}, {a:1});
```

## Quick reference by use case

| What you need | Function | Example |
|---------------|----------|---------|
| Split array into groups | `chunk(array, size)` | `chunk([1,2,3,4], 2)` → `[[1,2],[3,4]]` |
| Remove falsy values | `compact(array)` | `compact([0,1,false,2,''])` → `[1,2]` |
| Unique values | `uniq(array)` | `uniq([2,1,2])` → `[2,1]` |
| Deep compare objects | `isEqual(a, b)` | `isEqual({a:{b:1}}, {a:{b:1}})` → `true` |
| Safe nested get | `get(obj, path, default?)` | `get({a:{b:1}}, 'a.b')` → `1` |
| Safe nested set | `set(obj, path, value)` | `set({}, 'a.b.c', 42)` |
| Deep merge | `merge(obj, ...sources)` | `merge({a:1}, {b:2})` → `{a:1,b:2}` |
| Pick properties | `pick(obj, ...keys)` | `pick({a:1,b:2,c:3}, 'a','c')` → `{a:1,c:3}` |
| Omit properties | `omit(obj, ...keys)` | `omit({a:1,b:2}, 'b')` → `{a:1}` |
| Debounce | `debounce(fn, wait, opts?)` | `debounce(save, 300)` |
| Throttle | `throttle(fn, wait, opts?)` | `throttle(resize, 100)` |
| Group array by key | `groupBy(array, fn)` | `groupBy([6.1,4.2], Math.floor)` |
| Sort by multiple keys | `orderBy(array, keys, orders)` | `orderBy(users, ['name','age'], ['asc','desc'])` |
| Clone deeply | `cloneDeep(value)` | `cloneDeep(obj)` |
| Check type | `isString(val)`, `isPlainObject`, `isNil`, etc. | `isNil(null)` → `true` |
| Random element | `sample(array)` | `sample([1,2,3])` |
| Shuffle | `shuffle(array)` | `shuffle([1,2,3,4])` |
| Number range | `range(start, end, step)` | `range(0, 20, 5)` → `[0,5,10,15]` |
| Case conversion | `camelCase(str)`, `kebabCase`, `snakeCase` | `camelCase('Foo Bar')` → `'fooBar'` |
| HTML escape | `escape(str)` | `escape('&<>')` → `'&amp;&lt;&gt;'` |

## Security features (built-in, no configuration needed)

```typescript
import { sanitizePath, deepFreeze, safeClone, safeGet } from '@apithy-edson-gomez/helios';

// Protects against prototype pollution automatically:
set({}, '__proto__.admin', true)    // throws SecurityError
merge({}, maliciousSource)          // dangerous keys skipped
fromPairs([['__proto__', 'x']])     // silently filtered

// Explicit protection:
sanitizePath('__proto__')           // throws SecurityError
deepFreeze(configObject)            // recursively freezes
safeGet(userInput, 'path')          // blocks dangerous keys
safeClone(externalData)             // structuredClone with fallback
```

## Bundle size

| Format | Size | When to use |
|--------|------|-------------|
| `dist/helios.mjs` | 42.6 KB | ESM bundlers (webpack, vite, esbuild) |
| `dist/helios.cjs` | 43.3 KB | Node.js `require()` |
| Per-module files | ~51 KB total | Tree-shaking via individual imports |

## Lodash migration

Helios is a drop-in replacement with the same API surface as Lodash 4.18.1.
Replace lodash imports directly:

```typescript
// Before: import chunk from 'lodash/chunk';
// After:
import { chunk } from '@apithy-edson-gomez/helios';
```

Key differences:
- **Security**: all path-based functions block prototype pollution (Lodash doesn't)
- **Performance**: Set/Map-based lookups, write-pointer mutation (Lodash creates new arrays)
- **Size**: 42.6 KB vs Lodash's ~71 KB (minified)
- **Dependencies**: zero vs Lodash's zero (same, but Helios has no sub-dependencies)

## All categories

| Category | Count | Quick link |
|----------|:-----:|------------|
| [Array](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Array.md) | 65 | chunk, compact, difference, flatten, uniq, xor, zip |
| [Collection](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Collection.md) | 25 | filter, groupBy, orderBy, reduce, shuffle |
| [Function](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Function.md) | 19 | debounce, throttle, curry, memoize, once |
| [Lang](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Lang.md) | 41 | isEqual, cloneDeep, isEmpty, isPlainObject |
| [Math](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Math.md) | 15 | sum, mean, maxBy, round |
| [Object](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Object.md) | 20 | get, set, merge, pick, omit |
| [String](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/String.md) | 29 | camelCase, escape, pad, truncate |
| [Util](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Util.md) | 12 | range, times, uniqueId, iteratee |
| [Security](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/Security.md) | 5 | sanitizePath, deepFreeze, safeClone |

## API docs

Full API reference with tables, descriptions, and examples:
[`docs/v1.0/`](https://github.com/apithy-edson-gomez/helios/blob/main/docs/v1.0/)
