# Helios v1.0 — Lang

The Lang module provides 41 functions for type checking, comparison, cloning, and type conversion. Every type check returns `true` or `false`.

---

## Type Checks (29 functions)

| Function | Description | Example |
|---|---|---|
| `isArguments` | Checks if the value is an `arguments` object | `isArguments(arguments)` → `true` |
| `isArray` | Checks if the value is an array | `isArray([1, 2, 3])` → `true` |
| `isArrayBuffer` | Checks if the value is an `ArrayBuffer` | `isArrayBuffer(new ArrayBuffer(8))` → `true` |
| `isArrayLike` | Checks if the value is array-like (has a length) | `isArrayLike('abc')` → `true` |
| `isArrayLikeObject` | Checks if value is array-like and an object | `isArrayLikeObject('abc')` → `false` |
| `isBoolean` | Checks if the value is a boolean | `isBoolean(false)` → `true` |
| `isBuffer` | Checks if the value is a Node.js Buffer | `isBuffer(Buffer.from('hi'))` → `true` |
| `isDate` | Checks if the value is a Date | `isDate(new Date())` → `true` |
| `isElement` | Checks if the value is a DOM element | `isElement(document.body)` → `true` (browser) |
| `isEmpty` | Checks if the value is empty (empty array, object, map, set, string) | `isEmpty([])` → `true` |
| `isError` | Checks if the value is an Error | `isError(new TypeError())` → `true` |
| `isFinite` | Checks if the value is a finite number | `isFinite(Infinity)` → `false` |
| `isFunction` | Checks if the value is a function | `isFunction(() => {})` → `true` |
| `isInteger` | Checks if the value is an integer | `isInteger(3.0)` → `true` |
| `isLength` | Checks if the value is a valid array-like length | `isLength(3)` → `true`, `isLength(-1)` → `false` |
| `isMap` | Checks if the value is a Map | `isMap(new Map())` → `true` |
| `isNaN` | Checks if the value is `NaN` | `isNaN(NaN)` → `true` |
| `isNative` | Checks if the value is a native function | `isNative(Array.isArray)` → `true` |
| `isNil` | Checks if the value is `null` or `undefined` | `isNil(null)` → `true`, `isNil(undefined)` → `true` |
| `isNull` | Checks if the value is `null` | `isNull(null)` → `true` |
| `isNumber` | Checks if the value is a number | `isNumber(42)` → `true` |
| `isObject` | Checks if the value is an object-like (not null, not primitive) | `isObject({})` → `true`, `isObject(null)` → `false` |
| `isObjectLike` | Checks if the value is object-like (typeof === 'object' and not null) | `isObjectLike([1,2])` → `true` |
| `isPlainObject` | Checks if the value is a plain object (no custom prototype) | `isPlainObject({a:1})` → `true` |
| `isRegExp` | Checks if the value is a RegExp | `isRegExp(/test/)` → `true` |
| `isSafeInteger` | Checks if the value is a safe integer (±2^53-1) | `isSafeInteger(9007199254740991)` → `true` |
| `isSet` | Checks if the value is a Set | `isSet(new Set())` → `true` |
| `isString` | Checks if the value is a string | `isString('hello')` → `true` |
| `isSymbol` | Checks if the value is a Symbol | `isSymbol(Symbol())` → `true` |
| `isTypedArray` | Checks if the value is a typed array | `isTypedArray(new Uint8Array())` → `true` |
| `isUndefined` | Checks if the value is `undefined` | `isUndefined(void 0)` → `true` |
| `isWeakMap` | Checks if the value is a WeakMap | `isWeakMap(new WeakMap())` → `true` |
| `isWeakSet` | Checks if the value is a WeakSet | `isWeakSet(new WeakSet())` → `true` |

---

## Comparison Functions

| Function | Description | Example |
|---|---|---|
| `eq` | Performs SameValueZero comparison (treats `NaN` as equal to `NaN`) | `eq(NaN, NaN)` → `true`, `eq(0, -0)` → `true` |
| `isEqual` | Performs deep equality comparison between two values | `isEqual({a:[1,2]},{a:[1,2]})` → `true` |
| `isEqualWith` | Like `isEqual` but accepts a customizer function | `isEqualWith({x:1},{x:2},(a,b)=>true)` → `true` |

---

## Clone Functions

| Function | Description | Example |
|---|---|---|
| `clone` | Creates a shallow clone of a value | `clone({a:1})` → `{a:1}` (new reference) |
| `cloneDeep` | Creates a deep clone of a value | `cloneDeep({a:{b:2}})` → `{a:{b:2}}` (all new references) |

---

## Conversion Functions

| Function | Description | Example |
|---|---|---|
| `toArray` | Converts a value to an array | `toArray({a:1,b:2})` → `[1, 2]` |
| `toFinite` | Converts a value to a finite number | `toFinite(Infinity)` → `1.7976931348623157e+308` |
| `toInteger` | Converts a value to an integer | `toInteger(3.7)` → `3` |
| `toLength` | Converts a value to a valid array length (0 to 2^32-1) | `toLength(-1)` → `0` |
| `toNumber` | Converts a value to a number | `toNumber('3.2')` → `3.2` |
| `toPlainObject` | Converts a value to a plain object (inherited enumerable properties are included) | `toPlainObject(new Number(3))` → `{constructor: ...}` |
| `toString` | Converts a value to a string | `toString([1, 2])` → `'1,2'` |

---

## Notes

- **Type safety**: All type-check functions throw if the argument is not the expected type.
- **`isPlainObject` vs `isObject`**: `isPlainObject` checks that the object's prototype is exactly `Object.prototype` or `null`. `isObject` returns `true` for any non-null object, including arrays, dates, and RegExps.
- **`cloneDeep`** handles circular references, Maps, Sets, Buffers, and typed arrays. It uses `isPlainObject` to decide whether to recurse into an object.

[← Back to Overview](overview)
