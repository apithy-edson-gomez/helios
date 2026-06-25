// =============================================================================
// Helios Lang Module — Language Type Check Functions
// =============================================================================
// Security-hardened, zero-dependency Lodash-alternative type utilities.
// All type checks use Object.prototype.toString.call() as the canonical
// strategy. Every function is self-contained with no external imports.
// =============================================================================

// -----------------------------------------------------------------------------
// Internal Helpers
// -----------------------------------------------------------------------------

/** Cached tag strings for fast lookups. */
const TAG_ARGUMENTS = '[object Arguments]';
const TAG_ARRAY = '[object Array]';
const TAG_ARRAY_BUFFER = '[object ArrayBuffer]';
const TAG_BOOLEAN = '[object Boolean]';
const TAG_DATE = '[object Date]';
const TAG_ERROR = '[object Error]';
const TAG_FUNCTION = '[object Function]';
const TAG_GENERATOR_FUNCTION = '[object GeneratorFunction]';
const TAG_MAP = '[object Map]';
const TAG_NUMBER = '[object Number]';
const TAG_OBJECT = '[object Object]';
const TAG_REG_EXP = '[object RegExp]';
const TAG_SET = '[object Set]';
const TAG_STRING = '[object String]';
const TAG_SYMBOL = '[object Symbol]';
const TAG_WEAK_MAP = '[object WeakMap]';
const TAG_WEAK_SET = '[object WeakSet]';

/** Typed-array tag patterns. */
const TYPED_ARRAY_TAGS = new Set([
  '[object Int8Array]',
  '[object Uint8Array]',
  '[object Uint8ClampedArray]',
  '[object Int16Array]',
  '[object Uint16Array]',
  '[object Int32Array]',
  '[object Uint32Array]',
  '[object Float32Array]',
  '[object Float64Array]',
  '[object BigInt64Array]',
  '[object BigUint64Array]',
]);

/**
 * Returns the [[Class]] internal property via Object.prototype.toString.
 * This is the canonical type-tag strategy used throughout Helios.
 */
function getTag(value: unknown): string {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return Object.prototype.toString.call(value);
}

/** Maximum safe array-like length (2^32 - 1). */
const MAX_ARRAY_LENGTH = 4294967295;

// -----------------------------------------------------------------------------
// Type Check Functions
// -----------------------------------------------------------------------------

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is an arguments object.
 *
 * @example
 * (function() { return isArguments(arguments); })() // => true
 * isArguments([1, 2, 3]) // => false
 */
export function isArguments(value: unknown): value is IArguments {
  return getTag(value) === TAG_ARGUMENTS;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is an array.
 *
 * @example
 * isArray([1, 2, 3]) // => true
 * isArray('abc') // => false
 */
export const isArray: (value: unknown) => value is unknown[] = Array.isArray;

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is an ArrayBuffer.
 *
 * @example
 * isArrayBuffer(new ArrayBuffer(8)) // => true
 * isArrayBuffer(new Uint8Array(8)) // => false
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return getTag(value) === TAG_ARRAY_BUFFER;
}

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a boolean.
 *
 * @example
 * isBoolean(false) // => true
 * isBoolean(null) // => false
 */
export function isBoolean(value: unknown): value is boolean {
  return (
    value === true ||
    value === false ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) === TAG_BOOLEAN)
  );
}

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a Date.
 *
 * @example
 * isDate(new Date()) // => true
 * isDate('Mon April 23 2012') // => false
 */
export function isDate(value: unknown): value is Date {
  return getTag(value) === TAG_DATE;
}

/**
 * Checks if `value` is likely a DOM element.
 * Returns `false` when not running in a browser environment.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a DOM element.
 *
 * @example
 * isElement(document.body) // => true (in browser)
 * isElement('<body>') // => false
 */
export function isElement(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as Record<string, unknown>).nodeType === 1 &&
    typeof (value as Record<string, unknown>).nodeName === 'string'
  );
}

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties. Array-like values (strings, arrays, arguments) are empty if
 * they have a `length` of `0`. Maps and Sets are empty if their `size` is `0`.
 * Primitives and `null`/`undefined` are considered empty.
 *
 * @param value The value to inspect.
 * @returns `true` if `value` is empty.
 *
 * @example
 * isEmpty(null) // => true
 * isEmpty(true) // => true
 * isEmpty(1) // => true
 * isEmpty([1, 2, 3]) // => false
 * isEmpty('abc') // => false
 * isEmpty({ a: 1 }) // => false
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;

  // Strings and array-like
  if (
    typeof value === 'string' ||
    isArray(value) ||
    isArguments(value)
  ) {
    return (value as { length: number }).length === 0;
  }

  // Map or Set
  if (isMap(value) || isSet(value)) {
    return (value as Map<unknown, unknown>).size === 0;
  }

  // Buffer (Node.js)
  if (
    typeof Buffer !== 'undefined' &&
    (value as Record<string, unknown>).constructor === Buffer
  ) {
    return (value as { length: number }).length === 0;
  }

  // Objects: check own enumerable keys
  if (isObject(value)) {
    for (const _key in value as Record<string, unknown>) {
      if (Object.prototype.hasOwnProperty.call(value, _key)) {
        return false;
      }
    }
    return true;
  }

  // Primitives (booleans, numbers, symbols, etc.) are considered empty
  return true;
}

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is an error object.
 *
 * @example
 * isError(new Error()) // => true
 * isError(Error) // => false
 */
export function isError(value: unknown): value is Error {
  if (typeof value !== 'object' || value === null) return false;
  const tag = getTag(value);
  return (
    tag === TAG_ERROR ||
    tag === '[object EvalError]' ||
    tag === '[object RangeError]' ||
    tag === '[object ReferenceError]' ||
    tag === '[object SyntaxError]' ||
    tag === '[object TypeError]' ||
    tag === '[object URIError]'
  );
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a function.
 *
 * @example
 * isFunction(isFunction) // => true
 * isFunction(/abc/) // => false
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  if (typeof value !== 'function') return false;
  const tag = getTag(value);
  return (
    tag === TAG_FUNCTION ||
    tag === TAG_GENERATOR_FUNCTION ||
    tag === '[object AsyncFunction]' ||
    tag === '[object Proxy]'
  );
}

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on `Number.isInteger`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is an integer.
 *
 * @example
 * isInteger(3) // => true
 * isInteger(Number.MIN_VALUE) // => false
 * isInteger(Infinity) // => false
 * isInteger('3') // => false
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This is loosely based on the ToLength abstract operation in the
 * ECMAScript specification.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a valid length.
 *
 * @example
 * isLength(3) // => true
 * isLength(Number.MIN_VALUE) // => false
 * isLength(Infinity) // => false
 * isLength('3') // => false
 */
export function isLength(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    value > -1 &&
    value % 1 === 0 &&
    value <= MAX_ARRAY_LENGTH
  );
}

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a Map.
 *
 * @example
 * isMap(new Map()) // => true
 * isMap(new WeakMap()) // => false
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return getTag(value) === TAG_MAP;
}

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** Unlike `Number.isNaN`, this method **coerces** the value to a
 * number first, matching the semantics of the global `isNaN` function.
 *
 * @param value The value to check.
 * @returns `true` if `value` is `NaN` after coercion.
 *
 * @example
 * isNaN(NaN) // => true
 * isNaN(new Number(NaN)) // => true
 * isNaN(undefined) // => true (Number(undefined) = NaN)
 * isNaN('abc') // => true (Number('abc') = NaN)
 * isNaN('123') // => false
 */
export function isNaN(value: unknown): boolean {
  // Coerce to number first (may throw for Symbol)
  let num: number;
  try {
    num = Number(value);
  } catch {
    // Symbols throw on Number() conversion
    return true;
  }
  // NaN is the only value not equal to itself
  return num !== num;
}

/**
 * Checks if `value` is a native (host-implemented) function.
 *
 * Native functions have a `toString` result containing `[native code]`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a native function.
 *
 * @example
 * isNative(Array.prototype.push) // => true
 * isNative(function() {}) // => false
 */
export function isNative(value: unknown): boolean {
  if (typeof value !== 'function') return false;
  return /\[native code\]/.test(Function.prototype.toString.call(value));
}

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is nullish.
 *
 * @example
 * isNil(null) // => true
 * isNil(undefined) // => true
 * isNil(NaN) // => false
 * isNil('') // => false
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Checks if `value` is `null`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is `null`.
 *
 * @example
 * isNull(null) // => true
 * isNull(undefined) // => false
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a number.
 *
 * @example
 * isNumber(3) // => true
 * isNumber(Number.MIN_VALUE) // => true
 * isNumber(Infinity) // => true
 * isNumber('3') // => false
 */
export function isNumber(value: unknown): value is number {
  return (
    typeof value === 'number' ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) === TAG_NUMBER)
  );
}

/**
 * Checks if `value` is the language type of `Object` (e.g. arrays, functions,
 * objects, regexes, `new Number(0)`, and `new String('')`).
 *
 * **Note:** `null` is **not** considered an object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is object-like.
 *
 * @example
 * isObject({}) // => true
 * isObject([1, 2, 3]) // => true
 * isObject(isObject) // => true
 * isObject(null) // => false
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of `"object"`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is object-like.
 *
 * @example
 * isObjectLike({}) // => true
 * isObjectLike([1, 2, 3]) // => true
 * isObjectLike(isObjectLike) // => false (functions are typeof 'function')
 * isObjectLike(null) // => false
 */
export function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Checks if `value` is a plain object — meaning it was created by the `Object`
 * constructor or has a `[[Prototype]]` of `null`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a plain object.
 *
 * @example
 * isPlainObject({}) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject(new Date()) // => false
 * isPlainObject([1, 2, 3]) // => false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a regexp.
 *
 * @example
 * isRegExp(/abc/) // => true
 * isRegExp('/abc/') // => false
 */
export function isRegExp(value: unknown): value is RegExp {
  return getTag(value) === TAG_REG_EXP;
}

/**
 * Checks if `value` is a safe integer. An integer is safe if it's an integer
 * that can be exactly represented as an IEEE-754 double precision number.
 *
 * **Note:** This method is based on `Number.isSafeInteger`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a safe integer.
 *
 * @example
 * isSafeInteger(3) // => true
 * isSafeInteger(Number.MIN_SAFE_INTEGER) // => true
 * isSafeInteger(2 ** 53) // => false
 * isSafeInteger(Infinity) // => false
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a Set.
 *
 * @example
 * isSet(new Set()) // => true
 * isSet(new WeakSet()) // => false
 */
export function isSet(value: unknown): value is Set<unknown> {
  return getTag(value) === TAG_SET;
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a string.
 *
 * @example
 * isString('abc') // => true
 * isString(1) // => false
 */
export function isString(value: unknown): value is string {
  return (
    typeof value === 'string' ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) === TAG_STRING)
  );
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a symbol.
 *
 * @example
 * isSymbol(Symbol('abc')) // => true
 * isSymbol('abc') // => false
 */
export function isSymbol(value: unknown): value is symbol {
  return (
    typeof value === 'symbol' ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) === TAG_SYMBOL)
  );
}

/**
 * Checks if `value` is classified as a typed array (Int8Array, Uint8Array,
 * Float64Array, BigInt64Array, etc.).
 *
 * @param value The value to check.
 * @returns `true` if `value` is a typed array.
 *
 * @example
 * isTypedArray(new Uint8Array(8)) // => true
 * isTypedArray([]) // => false
 */
export function isTypedArray(value: unknown): boolean {
  return TYPED_ARRAY_TAGS.has(getTag(value));
}

/**
 * Checks if `value` is `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if `value` is `undefined`.
 *
 * @example
 * isUndefined(void 0) // => true
 * isUndefined(null) // => false
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a WeakMap.
 *
 * @example
 * isWeakMap(new WeakMap()) // => true
 * isWeakMap(new Map()) // => false
 */
export function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
  return getTag(value) === TAG_WEAK_MAP;
}

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @param value The value to check.
 * @returns `true` if `value` is a WeakSet.
 *
 * @example
 * isWeakSet(new WeakSet()) // => true
 * isWeakSet(new Set()) // => false
 */
export function isWeakSet(value: unknown): value is WeakSet<object> {
  return getTag(value) === TAG_WEAK_SET;
}

// -----------------------------------------------------------------------------
// Comparison Functions
// -----------------------------------------------------------------------------

/**
 * Performs a **SameValueZero** comparison between two values to determine if
 * they are equivalent.
 *
 * SameValueZero differs from strict equality (`===`) only in that it treats
 * `NaN` as equal to itself.
 *
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns `true` if the values are equivalent under SameValueZero.
 *
 * @example
 * eq(NaN, NaN) // => true
 * eq(0, -0) // => true (SameValueZero treats 0 and -0 as equal)
 * eq('a', Object('a')) // => false
 */
export function eq(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}

// -----------------------------------------------------------------------------
// Deep Equality
// -----------------------------------------------------------------------------

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, objects, `Date`, `RegExp`,
 * `Map`, `Set`, and nested structures. It handles circular references safely.
 *
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns `true` if the values are equivalent.
 *
 * @example
 * isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // => true
 * isEqual([1, 2, 3], [1, 2, 3]) // => true
 * isEqual(new Date('2020-01-01'), new Date('2020-01-01')) // => true
 */
export function isEqual(value: unknown, other: unknown): boolean {
  return isEqualWith(value, other);
}

/**
 * Performs a deep comparison between two values with support for a customizer
 * function.
 *
 * The customizer is invoked with up to five arguments:
 * `(objValue, othValue, key?, object?, other?)`. If the customizer returns a
 * value other than `undefined`, that value is returned as the comparison
 * result. If it returns `undefined`, the default comparison is used.
 *
 * @param value The value to compare.
 * @param other The other value to compare.
 * @param customizer Optional function to customize comparisons.
 * @returns `true` if the values are equivalent.
 *
 * @example
 * function isGreeting(value: any) {
 *   return /^(hello|hi)$/i.test(value);
 * }
 * isEqualWith('hello', 'hi', (a, b) => {
 *   if (isGreeting(a) && isGreeting(b)) return true;
 * }) // => true
 */
export function isEqualWith(
  value: unknown,
  other: unknown,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key?: string | number | symbol,
    object?: unknown,
    otherObject?: unknown,
  ) => unknown,
): boolean {
  const stack = new Map<object, object[]>();
  return baseIsEqual(value, other, customizer, stack);
}

/**
 * Recursive deep equality engine with circular-reference tracking.
 */
function baseIsEqual(
  value: unknown,
  other: unknown,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key?: string | number | symbol,
    object?: unknown,
    otherObject?: unknown,
  ) => unknown,
  stack?: Map<object, object[]>,
  key?: string | number | symbol,
  object?: unknown,
  otherObject?: unknown,
): boolean {
  // ---- Customizer ----
  if (customizer) {
    const result = customizer(value, other, key, object, otherObject);
    if (result !== undefined) return !!result;
  }

  // ---- SameValueZero check ----
  if (value === other || (value !== value && other !== other)) return true;

  // ---- Null / type mismatch ----
  if (value == null || other == null) return false;
  if (typeof value !== typeof other) return false;

  // ---- Object comparison (includes arrays) ----
  if (
    typeof value === 'object' &&
    value !== null &&
    typeof other === 'object' &&
    other !== null
  ) {
    // Circular reference detection
    if (stack && (stack.has(value as object) || stack.has(other as object))) {
      const seen = stack.get(value as object);
      if (seen && seen.includes(other)) return true;
    }
    if (!stack) stack = new Map<object, object[]>();
    const seenList = stack.get(value as object) || [];
    seenList.push(other);
    stack.set(value as object, seenList);

    const tag = getTag(value);
    if (tag !== getTag(other)) return false;

    switch (tag) {
      case TAG_REG_EXP: {
        const reA = value as RegExp;
        const reB = other as RegExp;
        return reA.source === reB.source && reA.flags === reB.flags;
      }

      case TAG_STRING: {
        return String(value) === String(other);
      }

      case TAG_NUMBER:
      case TAG_BOOLEAN:
      case TAG_DATE: {
        const valA = Number(value);
        const valB = Number(other);
        return valA === valB || (valA !== valA && valB !== valB);
      }

      case TAG_SYMBOL: {
        return (
          Symbol.prototype.valueOf.call(value) ===
          Symbol.prototype.valueOf.call(other)
        );
      }

      case TAG_SET: {
        const setA = value as Set<unknown>;
        const setB = other as Set<unknown>;
        if (setA.size !== setB.size) return false;
        let equal = true;
        setA.forEach((item) => {
          if (!equal) return;
          if (!hasSameValueInSet(item, setB, customizer, stack)) {
            equal = false;
          }
        });
        return equal;
      }

      case TAG_MAP: {
        const mapA = value as Map<unknown, unknown>;
        const mapB = other as Map<unknown, unknown>;
        if (mapA.size !== mapB.size) return false;
        let equal = true;
        mapA.forEach((valA, keyA) => {
          if (!equal) return;
          if (
            !mapB.has(keyA) ||
            !baseIsEqual(valA, mapB.get(keyA), customizer, stack)
          ) {
            equal = false;
          }
        });
        return equal;
      }

      case TAG_ARRAY: {
        const arrA = value as unknown[];
        const arrB = other as unknown[];
        if (arrA.length !== arrB.length) return false;
        for (let i = 0; i < arrA.length; i++) {
          if (
            !baseIsEqual(arrA[i], arrB[i], customizer, stack, i, value, other)
          ) {
            return false;
          }
        }
        return true;
      }

      case TAG_OBJECT: {
        return equalObjects(
          value as Record<string, unknown>,
          other as Record<string, unknown>,
          customizer,
          stack,
        );
      }

      case TAG_ARGUMENTS: {
        return equalObjects(
          (Object.prototype.hasOwnProperty.call(value, 'callee')
            ? value
            : {}) as Record<string, unknown>,
          (Object.prototype.hasOwnProperty.call(other, 'callee')
            ? other
            : {}) as Record<string, unknown>,
          customizer,
          stack,
        );
      }

      default: {
        // Typed arrays, ArrayBuffers, DataView, etc.
        if (
          (value as Record<string, unknown>).constructor !==
          (other as Record<string, unknown>).constructor
        ) {
          return false;
        }
        if (tag === TAG_ARRAY_BUFFER) {
          const bufA = new Uint8Array(value as ArrayBuffer);
          const bufB = new Uint8Array(other as ArrayBuffer);
          if (bufA.length !== bufB.length) return false;
          for (let i = 0; i < bufA.length; i++) {
            if (bufA[i] !== bufB[i]) return false;
          }
          return true;
        }
        if (TYPED_ARRAY_TAGS.has(tag)) {
          const arrA = new Uint8Array(
            (value as ArrayBufferView).buffer,
            (value as ArrayBufferView).byteOffset,
            (value as ArrayBufferView).byteLength,
          );
          const arrB = new Uint8Array(
            (other as ArrayBufferView).buffer,
            (other as ArrayBufferView).byteOffset,
            (other as ArrayBufferView).byteLength,
          );
          if (arrA.length !== arrB.length) return false;
          for (let i = 0; i < arrA.length; i++) {
            if (arrA[i] !== arrB[i]) return false;
          }
          return true;
        }
        // Fallback: compare own enumerable properties
        return equalObjects(
          value as Record<string, unknown>,
          other as Record<string, unknown>,
          customizer,
          stack,
        );
      }
    }
  }

  return false;
}

/**
 * Helper: checks if a Set contains a value identical to `item` via deep
 * equality (using the same customizer and stack).
 */
function hasSameValueInSet(
  item: unknown,
  set: Set<unknown>,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key?: string | number | symbol,
    object?: unknown,
    otherObject?: unknown,
  ) => unknown,
  stack?: Map<object, object[]>,
): boolean {
  let found = false;
  set.forEach((otherItem) => {
    if (!found && baseIsEqual(item, otherItem, customizer, stack)) {
      found = true;
    }
  });
  return found;
}

/**
 * Compares two plain objects deeply.
 */
function equalObjects(
  object: Record<string, unknown>,
  other: Record<string, unknown>,
  customizer?: (
    objValue: unknown,
    othValue: unknown,
    key?: string | number | symbol,
    object?: unknown,
    otherObject?: unknown,
  ) => unknown,
  stack?: Map<object, object[]>,
): boolean {
  const keysA = Object.keys(object);
  const keysB = Object.keys(other);
  if (keysA.length !== keysB.length) return false;

  // Check that `other` has every key from `object` (order-independent)
  const otherKeysSet = new Set(keysB);
  for (const key of keysA) {
    if (!otherKeysSet.has(key)) return false;
    if (
      !baseIsEqual(
        object[key],
        other[key],
        customizer,
        stack,
        key,
        object,
        other,
      )
    ) {
      return false;
    }
  }
  return true;
}

// -----------------------------------------------------------------------------
// Clone Functions
// -----------------------------------------------------------------------------

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method does **not** clone inherited properties or non-
 * enumerable properties.
 *
 * @param value The value to clone.
 * @returns The shallow cloned value.
 *
 * @example
 * const objects = [{ a: 1 }, { b: 2 }];
 * const shallow = clone(objects);
 * shallow[0] === objects[0] // => true (shared reference)
 */
export function clone<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;

  // Arrays
  if (isArray(value)) {
    return (value as unknown[]).slice() as unknown as T;
  }

  // ArrayBuffer
  if (value instanceof ArrayBuffer) {
    return (value as ArrayBuffer).slice(0) as unknown as T;
  }

  // Typed arrays
  if (isTypedArray(value)) {
    return new (value as any).constructor(
      (value as any).buffer,
    ) as unknown as T;
  }

  // Date
  if (isDate(value)) {
    return new Date((value as unknown as Date).getTime()) as unknown as T;
  }

  // RegExp
  if (isRegExp(value)) {
    return new RegExp(
      (value as RegExp).source,
      (value as RegExp).flags,
    ) as unknown as T;
  }

  // Map
  if (isMap(value)) {
    return new Map(value as Map<unknown, unknown>) as unknown as T;
  }

  // Set
  if (isSet(value)) {
    return new Set(value as Set<unknown>) as unknown as T;
  }

  // Buffer (Node.js)
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
    return (value as any).slice() as unknown as T;
  }

  // Plain objects and all other objects
  return Object.assign({}, value as Record<string, unknown>) as unknown as T;
}

/**
 * Creates a deep clone of `value`.
 *
 * Uses `structuredClone` when available (modern runtimes), falling back to a
 * manual recursive implementation that correctly handles circular references,
 * `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, and typed arrays.
 *
 * **Note:** Functions, `WeakMap`, and `WeakSet` are not deeply cloneable and
 * will be copied by reference.
 *
 * @param value The value to deep clone.
 * @returns The deep cloned value.
 *
 * @example
 * const objects = [{ a: 1 }, { b: 2 }];
 * const deep = cloneDeep(objects);
 * deep[0] === objects[0] // => false (new reference)
 *
 * @throws {Error} If `value` contains unsupported types that cannot be cloned.
 */
export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;

  // Try the native structuredClone first (available in Node 17+, modern browsers)
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value);
    } catch {
      // Fall through to manual implementation
    }
  }

  // Manual deep clone with circular reference support
  const cache = new WeakMap<object, unknown>();
  return deepClone(value, cache);
}

/**
 * Recursive deep clone engine with circular-reference tracking via WeakMap.
 */
function deepClone<T>(value: T, cache: WeakMap<object, unknown>): T {
  if (value === null || typeof value !== 'object') return value;

  const objKey = value as unknown as object;

  // Return cached clone if this object was already cloned
  const cached = cache.get(objKey);
  if (cached !== undefined) return cached as T;

  let result: unknown;

  if (isArray(value)) {
    result = [];
    cache.set(objKey, result);
    const arr = value as unknown[];
    const cloned = result as unknown[];
    for (let i = 0; i < arr.length; i++) {
      cloned[i] = deepClone(arr[i], cache);
    }
  } else if (isDate(value)) {
    result = new Date((value as unknown as Date).getTime());
    cache.set(objKey, result);
  } else if (isRegExp(value)) {
    result = new RegExp(
      (value as RegExp).source,
      (value as RegExp).flags,
    );
    cache.set(objKey, result);
  } else if (isMap(value)) {
    result = new Map();
    cache.set(objKey, result);
    const map = value as Map<unknown, unknown>;
    const cloned = result as Map<unknown, unknown>;
    map.forEach((v, k) => {
      cloned.set(deepClone(k, cache), deepClone(v, cache));
    });
  } else if (isSet(value)) {
    result = new Set();
    cache.set(objKey, result);
    const set = value as Set<unknown>;
    const cloned = result as Set<unknown>;
    set.forEach((v) => {
      cloned.add(deepClone(v, cache));
    });
  } else if (value instanceof ArrayBuffer) {
    result = (value as ArrayBuffer).slice(0);
    cache.set(objKey, result);
  } else if (ArrayBuffer.isView(value as unknown as ArrayBufferView)) {
    // Typed arrays and DataView
    const buffer = (value as unknown as ArrayBufferView).buffer;
    if (buffer instanceof ArrayBuffer) {
      const ctor = (value as any).constructor;
      const view = value as unknown as ArrayBufferView;
      const byteOffset = view.byteOffset;
      const byteLen = view.byteLength;
      const bytesPer = (value as any).BYTES_PER_ELEMENT || 1;
      result = new ctor(buffer.slice(0), byteOffset, byteLen / bytesPer);
      cache.set(objKey, result);
    } else {
      result = value;
    }
  } else if (isPlainObject(value) || isObject(value)) {
    result = {};
    cache.set(objKey, result);
    const obj = value as Record<string, unknown>;
    const cloned = result as Record<string, unknown>;
    for (const key of Object.keys(obj)) {
      cloned[key] = deepClone(obj[key], cache);
    }
    // Also copy symbol-keyed properties
    const symbols = Object.getOwnPropertySymbols(obj);
    for (const sym of symbols) {
      (cloned as any)[sym] = deepClone((obj as any)[sym], cache);
    }
  } else {
    // Fallback: copy by reference for unhandled types
    result = value;
  }

  return result as T;
}

// -----------------------------------------------------------------------------
// Conversion Functions
// -----------------------------------------------------------------------------

/**
 * Converts `value` to an array.
 *
 * @param value The value to convert.
 * @returns The converted array.
 *
 * @example
 * toArray({ a: 1, b: 2 }) // => [1, 2]
 * toArray('abc') // => ['a', 'b', 'c']
 * toArray(1) // => []
 * toArray(null) // => []
 */
export function toArray<T>(value: T): unknown[] {
  if (value == null) return [];

  if (isArray(value)) return (value as unknown[]).slice();

  if (isString(value)) {
    if ((value as string).length === 0) return [];
    return Array.from(value as string);
  }

  if (isMap(value) || isSet(value)) {
    return Array.from(value as unknown as Iterable<unknown>);
  }

  // Array-like objects (arguments, NodeList, etc.)
  if (isObjectLike(value)) {
    const obj = value as Record<string, unknown>;
    const length = obj.length;
    if (typeof length === 'number' && isLength(length)) {
      const result: unknown[] = [];
      for (let i = 0; i < length; i++) {
        result.push(obj[i]);
      }
      return result;
    }
    // Plain objects: return own enumerable values
    return Object.values(obj);
  }

  // Check for iterable protocol
  if (typeof value === 'object' && value !== null) {
    const iter = (value as any)[Symbol.iterator];
    if (typeof iter === 'function') {
      return Array.from(value as unknown as Iterable<unknown>);
    }
  }

  return [];
}

/**
 * Converts `value` to a finite number.
 *
 * @param value The value to convert.
 * @returns The converted finite number.
 *
 * @example
 * toFinite(3.2) // => 3.2
 * toFinite(Number.MIN_VALUE) // => 5e-324
 * toFinite(Infinity) // => 1.7976931348623157e+308
 * toFinite('3.2') // => 3.2
 * toFinite(null) // => 0
 */
export function toFinite(value: unknown): number {
  const num = toNumber(value);
  if (num !== num) return 0; // NaN -> 0
  if (num === Infinity) return Number.MAX_VALUE;
  if (num === -Infinity) return -Number.MAX_VALUE;
  return num;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on the ToInteger abstract operation.
 *
 * @param value The value to convert.
 * @returns The converted integer.
 *
 * @example
 * toInteger(3.2) // => 3
 * toInteger(Number.MIN_VALUE) // => 0
 * toInteger(Infinity) // => 1.7976931348623157e+308
 * toInteger('3.2') // => 3
 */
export function toInteger(value: unknown): number {
  const finite = toFinite(value);
  const remainder = finite % 1;
  return remainder ? finite - remainder : finite;
}

/**
 * Converts `value` to a valid array-like length.
 *
 * **Note:** This method is loosely based on the ToLength abstract operation.
 *
 * @param value The value to convert.
 * @returns The converted length (integer in [0, 2^32 - 1]).
 *
 * @example
 * toLength(3.2) // => 3
 * toLength(Number.MIN_VALUE) // => 0
 * toLength(Infinity) // => 4294967295
 * toLength('3.2') // => 3
 */
export function toLength(value: unknown): number {
  const len = toInteger(value);
  if (len <= 0) return 0;
  if (len > MAX_ARRAY_LENGTH) return MAX_ARRAY_LENGTH;
  return len;
}

/**
 * Converts `value` to a number.
 *
 * Handles string conversions for hex (`0x`), binary (`0b`), and octal (`0o`)
 * prefixes. Returns `NaN` for symbols and objects that cannot be coerced.
 *
 * @param value The value to convert.
 * @returns The converted number.
 *
 * @example
 * toNumber('3.2') // => 3.2
 * toNumber(Number.MIN_VALUE) // => 5e-324
 * toNumber(Infinity) // => Infinity
 * toNumber('0x1a') // => 26
 * toNumber(null) // => 0
 * toNumber(Symbol()) // => NaN
 */
export function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;

  // Symbols cannot be coerced to numbers
  if (isSymbol(value)) return NaN;

  // Dates: return milliseconds since epoch
  if (isDate(value)) return (value as Date).getTime();

  // Strings: handle numeric prefixes
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      if (trimmed.length >= 2 && trimmed.startsWith('0')) {
        const second = trimmed[1];
        if (second === 'x' || second === 'X') {
          const parsed = parseInt(trimmed, 16);
          return isNaN(parsed) ? NaN : parsed;
        }
        if (second === 'b' || second === 'B') {
          const parsed = parseInt(trimmed, 2);
          return isNaN(parsed) ? NaN : parsed;
        }
        if (second === 'o' || second === 'O') {
          const parsed = parseInt(trimmed, 8);
          return isNaN(parsed) ? NaN : parsed;
        }
      }
    }
    return +trimmed;
  }

  // Default coercion
  return Number(value);
}

/**
 * Converts `value` to a plain object (a plain object with all own enumerable
 * properties from `value`).
 *
 * @param value The value to convert.
 * @returns The converted plain object.
 *
 * @example
 * function Foo() { this.b = 2; }
 * Foo.prototype.c = 3;
 * toPlainObject(new Foo()) // => { b: 2 }
 * toPlainObject([1, 2, 3]) // => { '0': 1, '1': 2, '2': 3 }
 */
export function toPlainObject(
  value: unknown,
): Record<string, unknown> {
  // Spread onto a fresh object — copies all own enumerable properties
  return { ...(value as Record<string, unknown>) };
}

/**
 * Converts `value` to a string. An empty string is returned for `null` and
 * `undefined` values. The sign of `-0` is preserved as `'-0'`. Arrays are
 * recursively converted with their elements joined by commas.
 *
 * @param value The value to convert.
 * @returns The converted string.
 *
 * @example
 * toString(null) // => ''
 * toString(-0) // => '-0'
 * toString([1, 2, 3]) // => '1,2,3'
 * toString({ a: 1 }) // => '[object Object]'
 */
export function toString(value: unknown): string {
  if (value == null) return '';
  if (isArray(value)) {
    return (value as unknown[])
      .map((item: unknown) => toString(item))
      .join(',');
  }
  if (isString(value)) return value as string;

  // Preserve -0 sign
  if (value === 0 && 1 / (value as number) === -Infinity) return '-0';

  return String(value);
}
