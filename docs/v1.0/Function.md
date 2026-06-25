# Helios v1.0 — Function

The Function module provides 19 functions for controlling execution flow, composing functions, and managing invocation behavior. Includes full-featured `debounce` and `throttle` with leading/trailing/maxWait options.

---

## Function Reference

| Function | Description | Example |
|---|---|---|
| `after` | Creates a function that invokes once the count is reached | `after(3, () => 'done')` — calls the func on the 3rd call |
| `before` | Creates a function that invokes at most `n` times | `before(3, () => 'hi')` — calls the func on 1st & 2nd, not after |
| `bind` | Creates a bound function with partial arguments | `bind(fn, ctx, 1, 2)` — binds `this` to `ctx`, pre-fills args |
| `curry` | Curries a function — returns a new function until all args are received | `curry((a,b,c) => a+b+c)(1)(2)(3)` → `6` |
| `debounce` | Creates a debounced function (delays invocation) | `debounce(fn, 300)` — waits 300ms after last call to invoke |
| `defer` | Defers invocation until the current call stack clears | `defer(() => console.log('later'))` — similar to `setTimeout(0)` |
| `delay` | Invokes a function after `n` milliseconds | `delay(() => console.log('hi'), 1000)` — runs after 1s |
| `flip` | Creates a function with reversed argument order | `flip((a,b) => [a,b])(1,2)` → `[2,1]` |
| `memoize` | Memoizes a function — caches results by first argument | `memoize(Math.round)` — caches based on input |
| `negate` | Creates a function that negates the predicate result | `negate(Boolean)(1)` → `false` |
| `once` | Creates a function that can only be called once | `once(() => 'first')()` → `'first'`, subsequent calls return `'first'` |
| `overArgs` | Transforms arguments by running each through a transformer | `overArgs((a,b) => [a,b],[String,Boolean])(1,0)` → `['1',false]` |
| `partial` | Partially applies arguments from the left | `partial((a,b,c) => a+b+c, 1, 2)(3)` → `6` |
| `partialRight` | Partially applies arguments from the right | `partialRight((a,b,c) => a+b+c, 3)(1,2)` → `6` |
| `rest` | Creates a function that collects remaining args into an array | `rest((a, ...b) => b)(1,2,3)` → `[2,3]` |
| `spread` | Spreads an array argument into individual arguments | `spread((a,b) => a + b)([1, 2])` → `3` |
| `throttle` | Creates a throttled function (max once per interval) | `throttle(fn, 200)` — at most once per 200ms |
| `unary` | Creates a function that accepts only one argument | `unary((a,b) => [a,b])(1,2)` → `[1, undefined]` |
| `wrap` | Wraps a value in a function invocation | `wrap('hello', (v) => v.toUpperCase())` → `'HELLO'` |

---

## Debounce & Throttle Options

Both `debounce` and `throttle` accept an optional `options` object as the third argument:

### Debounce Options

| Option | Type | Default | Description |
|---|---|---|---|
| `leading` | `boolean` | `false` | Invoke on the leading edge instead of trailing |
| `trailing` | `boolean` | `true` | Invoke on the trailing edge |
| `maxWait` | `number` | `undefined` | Maximum time the function can be delayed |

### Throttle Options

| Option | Type | Default | Description |
|---|---|---|---|
| `leading` | `boolean` | `true` | Invoke on the leading edge |
| `trailing` | `boolean` | `true` | Invoke on the trailing edge |

### Returned Methods

Both `debounce` and `throttle` return a function with these methods:

| Method | Description |
|---|---|
| `cancel()` | Cancels any pending delayed invocation |
| `flush()` | Immediately invokes any pending invocation |
| `pending()` | Returns `true` if a call is pending |

### Example

```js
const save = debounce(async (data) => {
  await api.save(data);
}, 300, { leading: false, trailing: true, maxWait: 1000 });

// Rapid calls only trigger one save 300ms after the last call,
// but forced after 1 second max wait.

save.cancel();  // Cancel pending
save.flush();   // Force immediate run
save.pending(); // true/false
```

---

## Notes

- **`curry`** uses arity detection. For variadic functions, pass the arity: `curry(fn, 3)`.
- **`memoize`** uses the first argument as the cache key by default. Override by providing a `resolver` as the second argument.
- **`once`** is useful for initialization guards, event handler registration, and lazy initialization.

[← Back to Overview](overview)
