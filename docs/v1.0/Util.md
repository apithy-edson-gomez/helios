# Helios v1.0 — Util

The Util module provides 12 utility functions and the **iteratee shorthand** system used throughout the entire Helios library.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `constant` | Creates a function that always returns the same value | `constant(42)()` → `42` |
| `identity` | Returns the first argument it receives | `identity(42)` → `42` |
| `iteratee` | Creates a function that invokes callbacks/paths/matches on values | `iteratee('name')({name:'fred'})` → `'fred'` |
| `matches` | Creates a partial deep comparison function | `matches({a:1})({a:1,b:2})` → `true` |
| `matchesProperty` | Creates a function that compares a property against a value | `matchesProperty('a.b', 1)({a:{b:1}})` → `true` |
| `noop` | Returns `undefined` regardless of arguments | `noop()` → `undefined` |
| `property` | Creates a function that returns the value at a property path | `property('a.b')({a:{b:2}})` → `2` |
| `propertyOf` | Creates a function that gets values from a given object by path | `propertyOf({a:{b:2}})('a.b')` → `2` |
| `range` | Creates an array of numbers from start to end (exclusive) | `range(0, 5)` → `[0, 1, 2, 3, 4]` |
| `rangeRight` | Like `range` but in descending order | `rangeRight(0, 5)` → `[4, 3, 2, 1, 0]` |
| `times` | Invokes the iteratee n times, returning an array of results | `times(3, String)` → `['0', '1', '2']` |
| `uniqueId` | Generates a unique ID with an optional prefix | `uniqueId('contact_')` → `'contact_1'` |

---

## Iteratee Shorthand

Many Helios functions accept an **iteratee** argument that can be expressed in three forms:

### 1. Function callback

```js
map([1, 2, 3], n => n * 2)
// → [2, 4, 6]
```

### 2. String property name

Creates a function that extracts the named property from each element.

```js
sortBy([{x:2}, {x:1}], 'x')
// → [{x:1}, {x:2}]
```

Equivalent to: `arr.map(obj => obj['x'])`.

### 3. Object partial matcher

Creates a function that performs a partial deep comparison.

```js
filter([{a:1,b:2}, {a:1}], {a:1})
// → [{a:1,b:2}, {a:1}]
```

Equivalent to: `arr.filter(obj => isMatch(obj, {a:1}))`.

### Resolution Priority

`iteratee` resolves the shorthand as follows:

1. If the value is a **function**, use it directly.
2. If the value is a **string**, treat it as a property path (see `property`).
3. If the value is an **object** (and not null/array), treat it as a matcher (see `matches`).
4. Otherwise, fall back to `identity`.

---

## Notes

- **`uniqueId`** is not cryptographically secure. Use a proper UUID library for security-critical IDs.
- **`range`** accepts 1, 2, or 3 arguments: `range(stop)`, `range(start, stop)`, or `range(start, stop, step)`.
- **`times`** returns an array. For side effects, use `forEach` from the Collection module.

[← Back to Overview](overview)
