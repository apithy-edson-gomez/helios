# Helios v1.0 — Overview

Helios is a modern utility library for JavaScript/TypeScript, designed with **security**, **performance**, and **developer experience** as first-class concerns. It provides a comprehensive set of functions for arrays, collections, objects, strings, math, and more — with built-in protection against prototype pollution and other common vulnerabilities.

---

## Quick Start

### Installation

```bash
npm install @helios-lib/helios
```

### Basic Usage

```js
import { chunk, compact, debounce, get, set, isPlainObject } from '@helios-lib/helios';

// Array utilities
chunk(['a', 'b', 'c', 'd'], 2);
// → [['a', 'b'], ['c', 'd']]

compact([0, 1, false, 2, '', 3]);
// → [1, 2, 3]

// Secure deep access
const obj = { a: { b: { c: 42 } } };
get(obj, 'a.b.c');
// → 42

// Prototype-safe cloning
const cloned = safeClone({ __proto__: { malicious: true } });
// → cloned is a plain object without inherited malice
```

### Node & Browser

Helios ships as ESM, works in Node.js 18+, modern browsers, and Deno. Import directly or use the pre-built bundle:

```html
<script src="https://cdn.example.com/helios@1.0.0/helios.min.js"></script>
```

---

## Feature List

### Array (65 functions)

Complete suite of array manipulation including chunk, compact, concat, difference, drop, fill, findIndex, flatten (deep, depth), intersection, pull (with variants), remove, reverse, slice, sortedIndex family, union, uniq, unzip, without, xor, zip, and more.

[Full Array API →](Array)

### Collection (25 functions)

Functional iteration and querying: countBy, forEach, every, filter, find, flatMap, groupBy, includes, invokeMap, keyBy, map, orderBy, partition, reduce, reject, sample, shuffle, size, some, sortBy.

[Full Collection API →](Collection)

### Function (19 functions)

Control flow and function composition: after, before, bind, curry, debounce, defer, delay, flip, memoize, negate, once, overArgs, partial, partialRight, rest, spread, throttle, unary, wrap. Debounce and throttle support leading/trailing options.

[Full Function API →](Function)

### Lang (41 functions)

Type checking, equality, cloning, and conversion: 29 type-checks (isArguments through isWeakSet), eq, isEqual, isEqualWith, clone, cloneDeep, toArray, toFinite, toInteger, toLength, toNumber, toPlainObject, toString.

[Full Lang API →](Lang)

### Math (15 functions)

add, ceil, divide, floor, max, maxBy, mean, meanBy, min, minBy, multiply, round, subtract, sum, sumBy.

[Full Math API →](Math)

### Object (20 functions)

at, get, has, invert, invertBy, keys, mapKeys, mapValues, merge, omit, omitBy, pick, pickBy, result, set, toPairs, toPairsIn, transform, values, valuesIn. All object functions are protected against prototype pollution.

[Full Object API →](Object)

### String (29 functions)

camelCase, capitalize, deburr, endsWith, escape, escapeRegExp, kebabCase, lowerCase, lowerFirst, pad, padEnd, padStart, parseInt, repeat, replace, snakeCase, split, startCase, startsWith, toLower, toUpper, trim, trimEnd, trimStart, truncate, unescape, upperCase, upperFirst, words.

[Full String API →](String)

### Util (12 functions)

constant, identity, iteratee, matches, matchesProperty, noop, property, propertyOf, range, rangeRight, times, uniqueId. Plus full iteratee shorthand support.

[Full Util API →](Util)

### Security (5 functions)

sanitizePath, safeGet, deepFreeze, safeClone, isPlainObject. Defensive utilities to protect against prototype pollution, path traversal, and object tampering.

[Full Security API →](Security)

---

## Security Design

Helios is built with **proactive security** at every layer:

### Prototype Pollution Protection

Every function that reads or writes object paths (`get`, `set`, `merge`, `has`, etc.) validates path segments against `__proto__`, `constructor`, and `prototype` to prevent prototype pollution attacks.

```js
set({}, '__proto__.polluted', true);
// → Error: Dangerous path segment: __proto__
```

### Safe Deep Access

`safeGet` traverses nested objects without throwing on missing intermediate keys and rejects dangerous paths. Unlike plain `?.`, it also works with array indices and dotted string paths.

### Object Integrity

- `deepFreeze`: Recursively freezes an object tree (uses `Object.freeze` on every property).
- `isPlainObject`: Accurately detects plain objects vs classes/Map/Set/Array — crucial for JSON-safe operations.
- `safeClone`: Deep-clones an object while stripping dangerous prototype-chain properties.

### Path Traversal Prevention

`sanitizePath` strips `..` and `~` sequences used in path-traversal attacks on object-access operations.

### Key Design Principles

1. **Fail closed** — dangerous operations throw rather than silently corrupt state.
2. **Defense in depth** — multiple checks at different layers (path parsing, segment validation, output filtering).
3. **Zero trust** — never assume input is safe, even from internal calls.
4. **Performance-aware** — security checks are optimized; benchmarks show <5% overhead vs unprotected equivalents.

---

## License

Helios is released under the MIT License. See [LICENSE](./LICENSE) for details.
