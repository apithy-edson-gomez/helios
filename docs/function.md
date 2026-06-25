# Function

19 functions for controlling function execution — debounce, throttle, curry, memoize, and more.

| Function | Description | Example |
|----------|-------------|---------|
| `after(n, func)` | Call after n invocations | `after(3, fn)()` — calls fn on 3rd call |
| `before(n, func)` | Call up to n times | `before(3, fn)()` — calls fn only twice |
| `bind(func, thisArg, ...partials)` | Bind context and args | `bind(fn, obj, 'a')('b')` |
| `curry(func, arity)` | Curry function | `curry((a,b,c) => [a,b,c])(1)(2)(3)` → `[1,2,3]` |
| `debounce(func, wait, options)` | Debounce | `debounce(fn, 300)` — delays execution |
| `defer(func, ...args)` | Defer to next tick | `defer(() => console.log('later'))` |
| `delay(func, wait, ...args)` | Delay execution | `delay(() => console.log('hi'), 1000)` |
| `flip(func)` | Reverse arguments | `flip((a,b) => a)(1,2)` → `2` |
| `memoize(func, resolver)` | Cache results | `memoize(n => n*2)` |
| `negate(predicate)` | Negate predicate | `negate(n => n%2===0)(1)` → `true` |
| `once(func)` | Call only once | `once(fn)()` — subsequent calls return cached |
| `overArgs(func, transforms)` | Transform args before call | `overArgs(fn, [String, Number])('1', '2')` |
| `partial(func, ...partials)` | Partial application (left) | `partial((a,b,c) => [a,b,c], 1)(2,3)` → `[1,2,3]` |
| `partialRight(func, ...partials)` | Partial application (right) | `partialRight((a,b,c) => [a,b,c], 2,3)(1)` → `[1,2,3]` |
| `rest(func, start)` | Last args as array | `rest((a, rest) => [a, rest])(1,2,3)` → `[1,[2,3]]` |
| `spread(func, start)` | Spread array arg | `spread((a,b) => [a,b])([1,2])` → `[1,2]` |
| `throttle(func, wait, options)` | Throttle | `throttle(fn, 100)` — max 1 call per 100ms |
| `unary(func)` | Accept only 1 arg | `unary((...args) => args.length)(1,2,3)` → `1` |
| `wrap(value, wrapper)` | Wrap value in function | `wrap('hello', (v) => [v])('world')` → `['hello','world']` |

## Debounce options

```typescript
{ leading: boolean, trailing: boolean, maxWait: number }
```

- `leading` — fire on leading edge (default: `false` for debounce)
- `trailing` — fire on trailing edge (default: `true`)
- `maxWait` — max time between calls

Returns object with `cancel()` and `flush()` methods.

## Throttle options

```typescript
{ leading: boolean, trailing: boolean }
```

- `leading` — fire on leading edge (default: `true`)
- `trailing` — fire on trailing edge (default: `true`)

Returns object with `cancel()` and `flush()` methods.
