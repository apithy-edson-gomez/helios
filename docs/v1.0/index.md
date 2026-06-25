---
title: Helios v1.0
---

# Helios v1.0 ☀️

**High-efficiency, security-hardened Lodash alternative.**  
Zero dependencies. 231 functions. 43 KB.

---

## Quick links

| Category | Functions | Page |
|----------|-----------|------|
| [Array](array) | 65 | API reference |
| [Collection](collection) | 25 | API reference |
| [Function](function) | 19 | API reference |
| [Lang](lang) | 41 | API reference |
| [Math](math) | 15 | API reference |
| [Object](object) | 20 | API reference |
| [String](string) | 29 | API reference |
| [Util](util) | 12 | API reference |
| [Security](security) | 5 | API reference |

---

## Features

- **🔒 Security-first** — All functions block `__proto__`, `prototype`, and `constructor` pollution at every entry point.
- **⚡ Performance** — Simple `for` loops, `Set`/`Map` caches, binary search — no framework overhead.
- **🛡️ Zero dependencies** — Self-contained TypeScript. Nothing to audit.
- **📦 Tiny** — 43 KB minified bundle (ESM + CJS). Tree-shakeable.
- **🎯 TypeScript native** — Full type declarations included.

## Quick start

```
npm install @apithy-edson-gomez/helios
```

```typescript
import { chunk, isEqual, debounce, get, set, uniq, orderBy } from '@apithy-edson-gomez/helios';

// Array
chunk(['a', 'b', 'c', 'd'], 2);  // [['a','b'], ['c','d']]

// Lang
isEqual({ a: { b: 1 } }, { a: { b: 1 } });  // true

// Object
set(obj, 'a.b.c', 42);
get(obj, 'a.b.c');  // 42

// Collection
orderBy(users, ['user', 'age'], ['asc', 'desc']);
```

## Security design

Helios was built from the ground up to prevent prototype pollution attacks:

- **`sanitizePath()`** blocks `__proto__`, `prototype`, `constructor` at every entry
- **Safe property access** via `Object.prototype.hasOwnProperty.call()`
- **Output filtering** — `merge`, `set`, `fromPairs`, `zipObject`, `invert` all filter dangerous keys
- **`deepFreeze()`** — recursively freezes objects for immutable configs
- **`safeClone()`** — uses `structuredClone` with JSON fallback

## Adding or updating docs

Each category is its own markdown file in the `docs/v1.0/` directory.

To add a new function:
1. Open the right category file (e.g. `docs/v1.0/array.md`)
2. Add a row to the table — name, description, example
3. Commit and push

That's it. GitHub Pages updates automatically.
