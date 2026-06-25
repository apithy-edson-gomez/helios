# Lang

41 type-check, comparison, clone, and conversion utilities.

## Type checks

| Function | Description | Example |
|----------|-------------|---------|
| `isArguments(value)` | Check if arguments object | `isArguments(arguments)` → `true` |
| `isArray(value)` | Check if Array | `isArray([1,2,3])` → `true` |
| `isArrayBuffer(value)` | Check if ArrayBuffer | `isArrayBuffer(new ArrayBuffer(8))` → `true` |
| `isBoolean(value)` | Check if boolean | `isBoolean(false)` → `true` |
| `isDate(value)` | Check if Date | `isDate(new Date())` → `true` |
| `isElement(value)` | Check if DOM element | `isElement(document.body)` → `true` (browser) |
| `isEmpty(value)` | Check if empty | `isEmpty([])` → `true` |
| `isError(value)` | Check if Error | `isError(new Error())` → `true` |
| `isFunction(value)` | Check if function | `isFunction(() => {})` → `true` |
| `isInteger(value)` | Check if integer | `isInteger(3)` → `true` |
| `isLength(value)` | Check if valid length | `isLength(3)` → `true` |
| `isMap(value)` | Check if Map | `isMap(new Map())` → `true` |
| `isNaN(value)` | Coercing NaN check | `isNaN('abc')` → `true` |
| `isNative(value)` | Check if native function | `isNative(Array.prototype.push)` → `true` |
| `isNil(value)` | Check if null/undefined | `isNil(null)` → `true` |
| `isNull(value)` | Check if null | `isNull(null)` → `true` |
| `isNumber(value)` | Check if number | `isNumber(NaN)` → `true` |
| `isObject(value)` | Check if object (incl arrays/functions) | `isObject({})` → `true` |
| `isObjectLike(value)` | Check if typeof object + not null | `isObjectLike([])` → `true` |
| `isPlainObject(value)` | Check if plain object | `isPlainObject({})` → `true`, `isPlainObject([])` → `false` |
| `isRegExp(value)` | Check if RegExp | `isRegExp(/abc/)` → `true` |
| `isSafeInteger(value)` | Check if safe integer | `isSafeInteger(3)` → `true` |
| `isSet(value)` | Check if Set | `isSet(new Set())` → `true` |
| `isString(value)` | Check if string | `isString('abc')` → `true` |
| `isSymbol(value)` | Check if symbol | `isSymbol(Symbol())` → `true` |
| `isTypedArray(value)` | Check if typed array | `isTypedArray(new Uint8Array(8))` → `true` |
| `isUndefined(value)` | Check if undefined | `isUndefined(void 0)` → `true` |
| `isWeakMap(value)` | Check if WeakMap | `isWeakMap(new WeakMap())` → `true` |
| `isWeakSet(value)` | Check if WeakSet | `isWeakSet(new WeakSet())` → `true` |

## Comparison

| Function | Description | Example |
|----------|-------------|---------|
| `eq(value, other)` | SameValueZero equality | `eq(NaN, NaN)` → `true`, `eq(0, -0)` → `true` |
| `isEqual(value, other)` | Deep equality | `isEqual({a:{b:1}}, {a:{b:1}})` → `true` |
| `isEqualWith(value, other, customizer)` | Deep equality with customizer | `isEqualWith('hello', 'hi', (a,b) => /^(hi|hello)$/.test(a) && /^(hi|hello)$/.test(b))` → `true` |

## Clone

| Function | Description | Example |
|----------|-------------|---------|
| `clone(value)` | Shallow clone | `clone({a:1, b:2})` |
| `cloneDeep(value)` | Deep clone (structuredClone + fallback) | `cloneDeep({a:{b:1}})` |

## Conversion

| Function | Description | Example |
|----------|-------------|---------|
| `toArray(value)` | Convert to array | `toArray({a:1,b:2})` → `[1,2]` |
| `toFinite(value)` | Convert to finite number | `toFinite(Infinity)` → `1.79e+308` |
| `toInteger(value)` | Convert to integer | `toInteger(3.2)` → `3` |
| `toLength(value)` | Convert to valid array length | `toLength(-1)` → `0`, `toLength(Infinity)` → `2^32-1` |
| `toNumber(value)` | Convert to number | `toNumber('3.2')` → `3.2`, `toNumber('0xff')` → `255` |
| `toPlainObject(value)` | Convert to plain object | `toPlainObject(new Foo())` |
| `toString(value)` | Convert to string | `toString(-0)` → `'-0'`, `toString([1,2,3])` → `'1,2,3'` |
