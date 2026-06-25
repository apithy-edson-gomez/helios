# Security

5 standalone security utilities for prototype pollution prevention and safe data handling.

## Functions

| Function | Description | Example |
|----------|-------------|---------|
| `sanitizePath(path)` | Validate path, block dangerous keys | `sanitizePath('a.b.c')` → `['a','b','c']` / `sanitizePath('__proto__')` throws |
| `safeGet(obj, path, defaultValue)` | Safe nested get (blocks prototype keys) | `safeGet({a:1}, 'a')` → `1` |
| `deepFreeze(obj)` | Recursively freeze object | `deepFreeze({a:{b:1}})` |
| `safeClone(value)` | Clone via structuredClone + JSON fallback | `safeClone({a:1})` → `{a:1}` |
| `isPlainObject(value)` | Check if plain object | `isPlainObject({})` → `true` / `isPlainObject([])` → `false` |

## Dangerous keys blocked

The following keys are blocked across **all** Helios functions:

- `__proto__`
- `prototype`
- `constructor`

These are blocked at every entry point — `get`, `set`, `merge`, `fromPairs`, `zipObject`, `invert`, `at`, `property`, `invokeMap`, and all internal path resolution.

## What gets blocked

```typescript
// These all throw SecurityError:
sanitizePath('__proto__')
sanitizePath('prototype')
sanitizePath('constructor')

// Object functions block with throw:
get({}, '__proto__')              // throws
set({}, '__proto__.x', 1)         // throws
at({}, 'constructor')             // throws

// Collection/merge silently filter:
fromPairs([['__proto__', 'bad']]) // filtered, no pollution
merge({}, badSource)              // dangerous keys skipped
zipObject(['__proto__'], [1])     // filtered
```
