# Object

20 functions for object manipulation — get/set, pick/omit, merge, transform.

| Function | Description | Example |
|----------|-------------|---------|
| `at(object, ...paths)` | Values at paths | `at({a:{b:1,c:2}}, 'a.b', 'a.c')` → `[1, 2]` |
| `get(object, path, defaultValue)` | Value at path (safe) | `get({a:{b:1}}, 'a.b')` → `1` |
| `has(object, path)` | Check if path exists | `has({a:{b:1}}, 'a.b')` → `true` |
| `invert(object)` | Swap keys and values | `invert({a:1, b:2})` → `{1:'a', 2:'b'}` |
| `invertBy(object, iteratee)` | Invert with iteratee | `invertBy({a:1, b:2}, v => 'g'+v)` → `{g1:['a'], g2:['b']}` |
| `keys(object)` | Enumerable property names | `keys({a:1, b:2})` → `['a', 'b']` |
| `mapKeys(object, iteratee)` | Transform keys | `mapKeys({a:1}, (v,k) => k+v)` → `{a1:1}` |
| `mapValues(object, iteratee)` | Transform values | `mapValues({a:1, b:2}, v => v*2)` → `{a:2, b:4}` |
| `merge(object, ...sources)` | Deep merge (safe) | `merge({a:{b:1}}, {a:{c:2}})` → `{a:{b:1, c:2}}` |
| `omit(object, ...paths)` | Omit specified paths | `omit({a:1, b:2, c:3}, 'b')` → `{a:1, c:3}` |
| `omitBy(object, predicate)` | Omit by predicate | `omitBy({a:1, b:2}, v => v>1)` → `{a:1}` |
| `pick(object, ...paths)` | Pick specified paths | `pick({a:1, b:2, c:3}, 'a', 'c')` → `{a:1, c:3}` |
| `pickBy(object, predicate)` | Pick by predicate | `pickBy({a:1,b:2,c:3}, v => v>1)` → `{b:2, c:3}` |
| `result(object, path, defaultValue)` | Resolve value or call function | `result({a:()=>42}, 'a')` → `42` |
| `set(object, path, value)` | Set value at path (safe) | `set({}, 'a.b.c', 42)` → `{a:{b:{c:42}}}` |
| `toPairs(object)` | Object to [key, value] pairs | `toPairs({a:1,b:2})` → `[['a',1],['b',2]]` |
| `toPairsIn(object)` | Pairs including inherited | — |
| `transform(object, iteratee, accumulator)` | Object reduce | `transform({a:1,b:2}, (r,v,k) => (r.push(k+v),r), [])` → `['a1','b2']` |
| `values(object)` | Enumerable values | `values({a:1, b:2})` → `[1, 2]` |
| `valuesIn(object)` | Values including inherited | — |

## Security

All object functions block `__proto__`, `prototype`, and `constructor` paths:

```typescript
set({}, '__proto__.admin', true)   // throws SecurityError
get({}, '__proto__')                // throws SecurityError
merge({}, JSON.parse('{"__proto__":{"polluted":"yes"}}')) // silently filtered
```

For runtime-safe access use `safeGet` from the security module.
