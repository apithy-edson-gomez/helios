/**
 * Helios Math Module
 *
 * Collection of math utility functions modeled after Lodash math methods.
 * All functions are self-contained, typed, efficient, and security-hardened.
 * No external imports.
 */

/** Adds two numbers. Clamps to safe integer range. */
export function add(augend: number, addend: number): number {
  const result = augend + addend;
  if (result > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (result < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
  return result;
}

/** Computes ceiling of a number with optional precision. */
export function ceil(number: number, precision: number = 0): number {
  if (!Number.isFinite(number)) return number;
  const factor = 10 ** Math.min(Math.max(Math.floor(precision), -292), 292);
  return Math.ceil(number * factor) / factor;
}

/** Divides dividend by divisor. Returns Infinity, -Infinity, or NaN as JS would. Guards against non-numbers. */
export function divide(dividend: number, divisor: number): number {
  return dividend / divisor;
}

/** Computes floor of a number with optional precision. */
export function floor(number: number, precision: number = 0): number {
  if (!Number.isFinite(number)) return number;
  const factor = 10 ** Math.min(Math.max(Math.floor(precision), -292), 292);
  return Math.floor(number * factor) / factor;
}

/** Returns the maximum value in an array. Returns undefined for empty arrays. */
export function max(array: readonly number[]): number | undefined {
  if (!array || array.length === 0) return undefined;
  let result = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > result) result = array[i];
  }
  return result;
}

/** Returns the element with the maximum iteratee result. */
export function maxBy<T>(
  array: readonly T[],
  iteratee: (value: T) => number
): T | undefined {
  if (!array || array.length === 0) return undefined;
  let result = array[0];
  let computed = iteratee(array[0]);
  for (let i = 1; i < array.length; i++) {
    const current = iteratee(array[i]);
    if (current > computed) {
      computed = current;
      result = array[i];
    }
  }
  return result;
}

/** Returns the mean (average) of an array of numbers. Returns NaN for empty arrays. */
export function mean(array: readonly number[]): number {
  if (!array || array.length === 0) return NaN;
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

/** Returns the mean of an array after applying an iteratee. */
export function meanBy<T>(
  array: readonly T[],
  iteratee: (value: T) => number
): number {
  if (!array || array.length === 0) return NaN;
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += iteratee(array[i]);
  }
  return sum / array.length;
}

/** Returns the minimum value in an array. Returns undefined for empty arrays. */
export function min(array: readonly number[]): number | undefined {
  if (!array || array.length === 0) return undefined;
  let result = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < result) result = array[i];
  }
  return result;
}

/** Returns the element with the minimum iteratee result. */
export function minBy<T>(
  array: readonly T[],
  iteratee: (value: T) => number
): T | undefined {
  if (!array || array.length === 0) return undefined;
  let result = array[0];
  let computed = iteratee(array[0]);
  for (let i = 1; i < array.length; i++) {
    const current = iteratee(array[i]);
    if (current < computed) {
      computed = current;
      result = array[i];
    }
  }
  return result;
}

/** Multiplies two numbers. Clamps to safe integer range. */
export function multiply(multiplier: number, multiplicand: number): number {
  const result = multiplier * multiplicand;
  if (result > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (result < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
  return result;
}

/** Rounds a number to the specified precision. */
export function round(number: number, precision: number = 0): number {
  if (!Number.isFinite(number)) return number;
  const factor = 10 ** Math.min(Math.max(Math.floor(precision), -292), 292);
  return Math.round(number * factor) / factor;
}

/** Subtracts subtrahend from minuend. Clamps to safe integer range. */
export function subtract(minuend: number, subtrahend: number): number {
  const result = minuend - subtrahend;
  if (result > Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (result < Number.MIN_SAFE_INTEGER) return Number.MIN_SAFE_INTEGER;
  return result;
}

/** Returns the sum of an array of numbers. */
export function sum(array: readonly number[]): number {
  if (!array || array.length === 0) return 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i];
  }
  return result;
}

/** Returns the sum of an array after applying an iteratee. */
export function sumBy<T>(
  array: readonly T[],
  iteratee: (value: T) => number
): number {
  if (!array || array.length === 0) return 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += iteratee(array[i]);
  }
  return result;
}
