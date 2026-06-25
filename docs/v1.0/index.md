# Helios ☀️

> High-efficiency, security-hardened Lodash alternative — 231 functions, zero dependencies, 43 KB.

## Quick start

```
npm install @apithy-edson-gomez/helios
```

```typescript
import { chunk, isEqual, debounce, get, set, uniq, orderBy } from '@apithy-edson-gomez/helios';

chunk(['a', 'b', 'c', 'd'], 2);        // [['a','b'], ['c','d']]
isEqual({ a: { b: 1 } }, { a: { b: 1 } }); // true
set(obj, 'a.b.c', 42);
get(obj, 'a.b.c');                       // 42
orderBy(users, ['user', 'age'], ['asc', 'desc']);
```

## Version

| Version | Page |
|---------|------|
| v1.0 | [Overview](overview) · [Array](Array) · [Collection](Collection) · [Function](Function) · [Lang](Lang) · [Math](Math) · [Object](Object) · [String](String) · [Util](Util) · [Security](Security) |

## Features

- **Security-first** — All functions block `__proto__`, `prototype`, `constructor` pollution
- **Performance** — Simple `for` loops, `Set`/`Map` caches, binary search
- **Zero dependencies** — Self-contained TypeScript. Nothing to audit.
- **Tiny** — 43 KB minified bundle (ESM + CJS). Tree-shakeable.
- **TypeScript native** — Full type declarations.

## Security design

- `sanitizePath()` blocks dangerous keys at every entry
- Safe property access via `Object.prototype.hasOwnProperty.call()`
- `merge`, `set`, `fromPairs`, `zipObject`, `invert` filter dangerous keys
- `deepFreeze()` — recursively freeze objects
- `safeClone()` — structuredClone with JSON fallback
