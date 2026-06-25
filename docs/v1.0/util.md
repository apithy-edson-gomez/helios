# Util

12 general-purpose utilities.

| Function | Description | Example |
|----------|-------------|---------|
| `constant(value)` | Function that always returns value | `const fn = constant(42); fn(1,2,3)` → `42` |
| `identity(value)` | Returns its argument | `identity(42)` → `42` |
| `iteratee(func)` | Convert to iteratee | `iteratee('a.b')({a:{b:1}})` → `1` |
| `matches(source)` | Deep partial matcher | `matches({a:1})({a:1,b:2})` → `true` |
| `matchesProperty(path, srcValue)` | Property matcher | `matchesProperty('a.b', 1)({a:{b:1}})` → `true` |
| `noop()` | No-op (returns undefined) | `noop()` → `undefined` |
| `property(path)` | Property getter | `property('a.b')({a:{b:42}})` → `42` |
| `propertyOf(object)` | Property of object | `propertyOf({a:1})('a')` → `1` |
| `range(start, end, step)` | Number range | `range(0, 20, 5)` → `[0, 5, 10, 15]` |
| `rangeRight(start, end, step)` | Descending range | `rangeRight(0, 20, 5)` → `[15, 10, 5, 0]` |
| `times(n, iteratee)` | Call iteratee n times | `times(3, String)` → `['0','1','2']` |
| `uniqueId(prefix)` | Unique ID generator | `uniqueId('contact_')` → `'contact_1'` |

## `iteratee` shorthand resolution

The `iteratee` function auto-converts:

- **Function** → used as-is
- **String** → treated as property path: `iteratee('a.b')` → `obj => obj.a.b`
- **Object** → treated as matcher: `iteratee({a:1})` → `obj => isMatch(obj, {a:1})`
- **Array** → treated as `[path, value]`: `iteratee(['a', 1])` → `obj => obj.a === 1`
