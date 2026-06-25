# Helios ☀️

**High-efficiency, security-hardened Lodash alternative.**  
Zero dependencies. 231 functions. 43 KB.

---

## Quick links

| Category | Functions | File |
|----------|-----------|------|
| [Array](/apithy-edson-gomez/helios/docs/array) | 65 | [`docs/array.md`](array.md) |
| [Collection](/apithy-edson-gomez/helios/docs/collection) | 25 | [`docs/collection.md`](collection.md) |
| [Function](/apithy-edson-gomez/helios/docs/function) | 19 | [`docs/function.md`](function.md) |
| [Lang](/apithy-edson-gomez/helios/docs/lang) | 41 | [`docs/lang.md`](lang.md) |
| [Math](/apithy-edson-gomez/helios/docs/math) | 15 | [`docs/math.md`](math.md) |
| [Object](/apithy-edson-gomez/helios/docs/object) | 20 | [`docs/object.md`](object.md) |
| [String](/apithy-edson-gomez/helios/docs/string) | 29 | [`docs/string.md`](string.md) |
| [Util](/apithy-edson-gomez/helios/docs/util) | 12 | [`docs/util.md`](util.md) |
| [Security](/apithy-edson-gomez/helios/docs/security) | 5 | [`docs/security.md`](security.md) |

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

Each category is its own markdown file in the [`docs/`](https://github.com/apithy-edson-gomez/helios/tree/main/docs) directory.

To add a new function:
1. Open the right category file (e.g. `docs/array.md`)
2. Add a row to the table — name, description, example
3. Commit and push

That's it. GitHub Pages updates automatically.
