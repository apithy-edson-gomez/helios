# Helios v1.0 — Object

The Object module provides 20 functions for working with object properties, keys, and values. **Every function in this module is protected against prototype pollution.**

---

## Security Note

All Helios Object functions validate property path segments against the following dangerous patterns:

- `__proto__`
- `constructor`
- `prototype`
- `__defineGetter__`
- `__defineSetter__`
- `__lookupGetter__`
- `__lookupSetter__`

If any path segment matches a dangerous key, the function **throws an error** instead of silently mutating global state.

```js
set({}, '__proto__.polluted', true);
// → Error: Dangerous path segment: __proto__

get({}, 'constructor.prototype.x');
// → Error: Dangerous path segment: constructor
```

This protects against [Prototype Pollution](https://portswigger.net/web-security/prototype-pollution) vulnerabilities, a class of attacks that can lead to remote code execution or property injection.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `at` | Returns values at specified paths of an object | `at({a:{b:1}}, ['a.b'])` → `[1]` |
| `get` | Gets the value at a path; returns `defaultValue` if undefined | `get({a:{b:2}}, 'a.b')` → `2`, `get(obj, 'x.y', 'fallback')` → `'fallback'` |
| `has` | Checks if a path exists in the object (own + inherited) | `has({a:{b:2}}, 'a.b')` → `true` |
| `invert` | Creates an object with keys and values swapped | `invert({a:1, b:2})` → `{1:'a', 2:'b'}` |
| `invertBy` | Like `invert` but uses an iteratee to generate keys | `invertBy({a:1,b:2}, v => 'k' + v)` → `{k1:['a'], k2:['b']}` |
| `keys` | Returns the enumerable own property names of an object | `keys({a:1, b:2})` → `['a', 'b']` |
| `mapKeys` | Creates an object with the same values but transformed keys | `mapKeys({a:1,b:2}, (v,k) => k + v)` → `{a1:1, b2:2}` |
| `mapValues` | Creates an object with the same keys but transformed values | `mapValues({a:1,b:2}, v => v * 2)` → `{a:2, b:4}` |
| `merge` | Recursively merges own and inherited enumerable properties | `merge({a:{x:1}}, {a:{y:2}})` → `{a:{x:1, y:2}}` |
| `omit` | Creates an object with specified paths omitted | `omit({a:1,b:2,c:3}, ['a','c'])` → `{b:2}` |
| `omitBy` | Like `omit` but uses a predicate | `omitBy({a:1,b:2}, v => v > 1)` → `{a:1}` |
| `pick` | Creates an object with only the specified paths | `pick({a:1,b:2,c:3}, ['a','c'])` → `{a:1, c:3}` |
| `pickBy` | Like `pick` but uses a predicate | `pickBy({a:1,b:2}, v => v > 1)` → `{b:2}` |
| `result` | Gets the value at a path, invoking functions along the path | `result({a:{b:() => 3}}, 'a.b')` → `3` |
| `set` | Sets the value at a path, creating intermediate objects as needed | `set({}, 'a.b.c', 1)` → `{a:{b:{c:1}}}` |
| `toPairs` | Converts an object to an array of key-value pairs | `toPairs({a:1,b:2})` → `[['a',1],['b',2]]` |
| `toPairsIn` | Like `toPairs` but includes inherited enumerable properties | `toPairsIn(new function(){this.a=1}())` → `[['a',1]]` |
| `transform` | An alternative to `reduce` for objects (accumulator mutated) | `transform({a:1,b:2}, (acc,v,k) => (acc[k]=v*2, acc), {})` → `{a:2,b:4}` |
| `values` | Returns the enumerable own property values of an object | `values({a:1, b:2})` → `[1, 2]` |
| `valuesIn` | Like `values` but includes inherited enumerable properties | `valuesIn({a:1})` → `[1]` |

---

## Notes

- **`get` vs `safeGet`**: `get` is the safe variant from the Object module. See [Security → safeGet](Security) for the dedicated security function with additional traversal protection.
- **`merge`** handles plain objects and arrays. Other types (e.g., `Date`, `RegExp`) are replaced, not merged.
- **Path syntax**: All path-based functions accept dot-separated strings (`'a.b.c'`) and arrays (`['a', 'b', 'c']`). Array indices are also supported: `'a[0].b'`.
- **Performance**: Security validation adds <5% overhead over unprotected implementations.

[← Back to Overview](overview)
