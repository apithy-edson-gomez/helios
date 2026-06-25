# Helios v1.0 — Security

The Security module provides 5 defensive utilities to protect against prototype pollution, path traversal, and object tampering. These are the foundation of Helios's security model.

---

## Philosophy

Helios embraces a **defense-in-depth** approach:

1. **Path validation** — every path segment is checked against dangerous keys.
2. **Object integrity** — deep freezing and safe cloning prevent tampering.
3. **Input sanitization** — path traversal sequences are stripped before access.
4. **Type safety** — `isPlainObject` ensures you only recurse into safe objects.
5. **Fail closed** — all security functions throw on dangerous input rather than silently producing unsafe results.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `sanitizePath` | Strips path-traversal (`..`) and homoglyph (`~`) sequences from a path string | `sanitizePath('a..b')` → `'a.b'` |
| `safeGet` | Deeply gets a property value, rejecting dangerous paths and returning a default on missing intermediates | `safeGet({a:{b:1}}, 'a.b')` → `1` |
| `deepFreeze` | Recursively freezes an object and all its properties using `Object.freeze` | `deepFreeze({a:{b:1}})` — `a.b` is now read-only |
| `safeClone` | Deep-clones an object while stripping dangerous prototype-chain properties | `safeClone({__proto__:{polluted:true}})` — clean clone |
| `isPlainObject` | Checks if a value is a plain object (custom prototype objects return `false`) | `isPlainObject({a:1})` → `true`, `isPlainObject(new Map())` → `false` |

---

## Dangerous Keys Reference

The following property path segments are considered **dangerous** and are blocked by all Helios path-access functions:

| Danger Key | Risk |
|---|---|
| `__proto__` | Prototype pollution — can inject properties into all objects |
| `constructor` | Can access the `Object` constructor and its prototype |
| `prototype` | Can access a function's prototype chain for pollution |
| `__defineGetter__` | Legacy API that can be used to define getters on objects |
| `__defineSetter__` | Legacy API that can be used to define setters on objects |
| `__lookupGetter__` | Legacy API that can inspect getter definitions |
| `__lookupSetter__` | Legacy API that can inspect setter definitions |

### Blocking Behavior

- Functions **throw** an error (`Dangerous path segment: ...`) when a blocked key is encountered.
- This applies to `get`, `set`, `has`, `merge`, `pick`, `omit`, `at`, `result`, and all other path-based functions in the [Object](Object) module.
- `safeGet` and `sanitizePath` in this module provide additional layers of protection.

---

## Usage Examples

### Safe deep access

```js
import { safeGet } from '@helios-lib/helios';

const data = { user: { profile: { name: 'Alice' } } };

// Works like optional chaining but with path strings
safeGet(data, 'user.profile.name');
// → 'Alice'

// Returns defaultValue instead of throwing on missing keys
safeGet(data, 'user.missing.key', 'fallback');
// → 'fallback'

// Throws on dangerous paths
safeGet(data, '__proto__.polluted');
// → Error: Dangerous path segment: __proto__
```

### Deep freeze

```js
import { deepFreeze } from '@helios-lib/helios';

const config = deepFreeze({ db: { host: 'localhost', port: 5432 } });

config.db.port = 9999;
// In strict mode: TypeError: Cannot assign to read-only property
// In sloppy mode: silently fails — config.db.port is still 5432
```

### Safe clone

```js
import { safeClone } from '@helios-lib/helios';

const malicious = { __proto__: { polluted: true }, data: 42 };
const cloned = safeClone(malicious);

// cloned is a clean object — no prototypal pollution
Object.getPrototypeOf(cloned);
// → Object.prototype (plain, clean)
```

### Path sanitization

```js
import { sanitizePath } from '@helios-lib/helios';

sanitizePath('a..b..c');
// → 'a.b.c'

sanitizePath('a.~.b');
// → 'a.b'
```

---

## Notes

- **`safeGet` vs `get`**: The [Object](Object) module's `get` also blocks dangerous keys. `safeGet` additionally provides a `defaultValue` parameter and is designed for scenarios where you need explicit control over missing-key behavior.
- **`deepFreeze`** is one-way — there is no `deepUnfreeze`. Freezing is intended for configuration objects and constants.
- **`isPlainObject`** is used internally by `cloneDeep`, `merge`, and other functions to decide whether to recurse into an object. It returns `false` for `Map`, `Set`, `Array`, typed arrays, class instances, and other non-plain objects.

[← Back to Overview](overview)
