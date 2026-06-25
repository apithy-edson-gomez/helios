/**
 * Helios Utility Module
 *
 * Collection of general utility functions modeled after Lodash utility methods.
 * All functions are self-contained, typed, efficient, and security-hardened.
 * No external imports.
 */

/** A generic function type. */
type AnyFunction = (...args: unknown[]) => unknown;

/** A dictionary/object type. */
type AnyObject = Record<string | number | symbol, unknown>;

/** Path type for property access. */
type PropertyPath = string | string[];

// ─── Internal helpers ────────────────────────────────────────────────────────

/** Splits a path string into segments, handling bracket notation. */
function parsePath(path: string | string[]): string[] {
  if (Array.isArray(path)) return path.map(String);
  const segments: string[] = [];
  let current = '';
  let inBracket = false;
  let inQuote: string | null = null;
  for (let i = 0; i < path.length; i++) {
    const ch = path[i];
    if (inQuote) {
      if (ch === '\\' && i + 1 < path.length) {
        current += path[i + 1];
        i++;
      } else if (ch === inQuote) {
        inQuote = null;
      } else {
        current += ch;
      }
    } else if (inBracket) {
      if (ch === "'" || ch === '"') {
        inQuote = ch;
      } else if (ch === ']') {
        if (current.length > 0) segments.push(current);
        current = '';
        inBracket = false;
      } else {
        current += ch;
      }
    } else if (ch === '.') {
      if (current.length > 0) segments.push(current);
      current = '';
    } else if (ch === '[') {
      if (current.length > 0) segments.push(current);
      current = '';
      inBracket = true;
    } else {
      current += ch;
    }
  }
  if (current.length > 0) segments.push(current);
  return segments;
}

/** Checks for dangerous property keys. */
function isSafeKey(key: string): boolean {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

/** Gets a nested property value safely. */
function getValue(object: unknown, path: string | string[]): unknown {
  const segments = typeof path === 'string' ? parsePath(path) : path.map(String);
  let value = object;
  for (const segment of segments) {
    if (!isSafeKey(segment)) return undefined;
    if (value == null || typeof value !== 'object') return undefined;
    value = (value as AnyObject)[segment];
  }
  return value;
}

/** Deeply compares two objects/values for equality (simple deep equality). */
function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return a === b;

  const arrA = Array.isArray(a);
  const arrB = Array.isArray(b);
  if (arrA !== arrB) return false;

  if (arrA && arrB) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a as AnyObject);
  const keysB = Object.keys(b as AnyObject);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b as AnyObject, key)) return false;
    if (!isEqual((a as AnyObject)[key], (b as AnyObject)[key])) return false;
  }
  return true;
}

// ─── Identity counter ────────────────────────────────────────────────────────

let idCounter = 0;

// ─── Exported Functions ──────────────────────────────────────────────────────

/**
 * Returns the same value passed as argument.
 * Used as a default iteratee.
 */
export function identity<T>(value: T): T {
  return value;
}

/**
 * A no-operation function that returns undefined.
 */
export function noop(): undefined {
  return undefined;
}

/**
 * Creates a function that always returns the same value.
 */
export function constant<T>(value: T): (...args: unknown[]) => T {
  return (..._args: unknown[]) => value;
}

/**
 * Invokes the iteratee n times, returning an array of the results.
 */
export function times<T>(n: number, iteratee: (index: number) => T): T[] {
  const result: T[] = [];
  const safeN = Math.max(0, Math.floor(n));
  if (Number.isNaN(safeN) || !Number.isFinite(safeN)) return result;
  for (let i = 0; i < safeN; i++) {
    result.push(iteratee(i));
  }
  return result;
}

/**
 * Creates a function that returns the value at a given path of an object.
 */
export function property(path: PropertyPath): (object: unknown) => unknown {
  return (object: unknown) => getValue(object, path);
}

/**
 * Creates a function that returns the value at a given path of a provided object.
 * Inverse of property.
 */
export function propertyOf(
  object: unknown
): (path: PropertyPath) => unknown {
  return (path: PropertyPath) => getValue(object, path);
}

/**
 * Creates a function that checks if a given object matches the source object
 * via deep equality of its properties.
 */
export function matches(source: AnyObject): (object: unknown) => boolean {
  return (object: unknown) => {
    if (object == null || typeof object !== 'object') return false;
    if (source == null) return false;
    for (const key of Object.keys(source)) {
      if (!isSafeKey(key)) continue;
      const srcVal = source[key];
      const objVal = (object as AnyObject)[key];
      if (!isEqual(objVal, srcVal)) return false;
    }
    return true;
  };
}

/**
 * Creates a function that checks if the property at a given path of an object
 * equals a given source value (using deep equality).
 */
export function matchesProperty(
  path: PropertyPath,
  srcValue: unknown
): (object: unknown) => boolean {
  const getter = property(path);
  return (object: unknown) => {
    const value = getter(object);
    return isEqual(value, srcValue);
  };
}

/**
 * Converts a value into an iteratee function.
 * - If func is already a function, returns it.
 * - If func is a string/array, treats it as a property path.
 * - If func is an object, treats it as a matches source.
 */
export function iteratee(
  func: AnyFunction | PropertyPath | AnyObject
): AnyFunction {
  if (typeof func === 'function') return func;
  if (typeof func === 'string' || Array.isArray(func)) {
    return property(func);
  }
  if (func !== null && typeof func === 'object') {
    return matches(func);
  }
  return identity;
}

/**
 * Generates a unique ID. If prefix is given, prepends it.
 */
export function uniqueId(prefix: string = ''): string {
  idCounter += 1;
  return prefix + idCounter.toString();
}

/**
 * Creates an array of numbers (positive and/or negative) progressing from start
 * up to, but not including, end. A step of 0 is treated as 1.
 */
export function range(
  start: number = 0,
  end?: number,
  step?: number
): number[] {
  let s = start;
  let e = end;
  let st = step;

  // Handle single argument: range(5) → [0, 1, 2, 3, 4]
  if (e === undefined) {
    e = s;
    s = 0;
  }

  if (st === undefined) {
    st = s < e ? 1 : -1;
  }

  if (st === 0) st = 1;

  const result: number[] = [];
  if (st > 0) {
    for (let i = s; i < e; i += st) {
      result.push(i);
    }
  } else {
    for (let i = s; i > e; i += st) {
      result.push(i);
    }
  }
  return result;
}

/**
 * Creates an array of numbers progressing from start up to, but not including,
 * end. Returns a descending array (like range but reversed order).
 */
export function rangeRight(
  start: number = 0,
  end?: number,
  step?: number
): number[] {
  return range(start, end, step).reverse();
}
