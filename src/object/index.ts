/**
 * Helios Object Module
 *
 * Collection of object utility functions modeled after Lodash object methods.
 * All functions are self-contained, typed, efficient, and security-hardened
 * against prototype pollution.
 * No external imports.
 */

type AnyObject = Record<string | number | symbol, unknown>;

/** DANGEROUS property keys that must never be set or read. */
const DANGEROUS_KEYS = new Set<string>([
  '__proto__',
  'constructor',
  'prototype',
]);

/**
 * Safely checks if an object has own property using Object.hasOwn or hasOwnProperty.
 * Avoids calling .hasOwnProperty() directly in case it's overridden.
 */
function safeHasOwn(obj: AnyObject, key: string | number | symbol): boolean {
  if (Object.prototype.hasOwnProperty.call(obj, key)) return true;
  // Also check brand-new objects where __proto__ is an accessor.
  // We use Object.hasOwn as a modern alternative when available.
  if (typeof (Object as unknown as Record<string, unknown>).hasOwn === 'function') {
    return ((Object as unknown as Record<string, Function>).hasOwn as (obj: object, key: string) => boolean)(obj as object, key as string);
  }
  return false;
}

/**
 * Splits a path string into an array of segments. Handles bracket notation.
 * e.g., "a.b[0].c" → ["a", "b", "0", "c"]
 */
function parsePath(path: string | string[]): string[] {
  if (Array.isArray(path)) return path.map(String);
  // Handle bracket notation: a[0].b → ['a', '0', 'b']
  // Also handle quoted keys: a["b c"].d → ['a', 'b c', 'd']
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

/**
 * Creates an array of values from the specified object paths.
 * Security: blocks __proto__/constructor/prototype.
 */
export function at(object: AnyObject, ...paths: (string | string[])[]): unknown[] {
  const results: unknown[] = [];
  for (const path of paths) {
    const segments = typeof path === 'string' ? parsePath(path) : path.map(String);
    let value: unknown = object;
    let found = true;
    for (const segment of segments) {
      if (DANGEROUS_KEYS.has(segment)) {
        found = false;
        break;
      }
      if (value == null || typeof value !== 'object') {
        found = false;
        break;
      }
      const obj = value as AnyObject;
      if (!safeHasOwn(obj, segment)) {
        found = false;
        break;
      }
      value = obj[segment];
    }
    results.push(found ? value : undefined);
  }
  return results;
}

/**
 * Gets the value at the path of object. If resolved value is undefined,
 * returns the defaultValue.
 * Security: blocks __proto__/constructor/prototype.
 */
export function get<TDefault = unknown>(
  object: AnyObject,
  path: string | string[],
  defaultValue?: TDefault
): unknown | TDefault {
  const segments = typeof path === 'string' ? parsePath(path) : path.map(String);
  let value: unknown = object;
  for (const segment of segments) {
    if (DANGEROUS_KEYS.has(segment)) return defaultValue;
    if (value == null || typeof value !== 'object') return defaultValue;
    const obj = value as AnyObject;
    if (!safeHasOwn(obj, segment)) return defaultValue;
    value = obj[segment];
  }
  return value !== undefined ? value : defaultValue;
}

/**
 * Checks if the path is a direct property of the object.
 * Security: hasOwnProperty check, blocks dangerous paths.
 */
export function has(object: AnyObject, path: string | string[]): boolean {
  const segments = typeof path === 'string' ? parsePath(path) : path.map(String);
  let current: unknown = object;
  for (const segment of segments) {
    if (DANGEROUS_KEYS.has(segment)) return false;
    if (current == null || typeof current !== 'object') return false;
    const obj = current as AnyObject;
    if (!safeHasOwn(obj, segment)) return false;
    current = obj[segment];
  }
  return true;
}

/**
 * Creates an object composed of the inverted keys and values of object.
 * If object contains duplicate values, later values overwrite earlier ones.
 * Security: blocks __proto__ in new keys.
 */
export function invert(object: AnyObject): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(object)) {
    const value = String(object[key]);
    // Block dangerous values from becoming property keys
    if (DANGEROUS_KEYS.has(value)) continue;
    result[value] = key;
  }
  return result;
}

/**
 * Creates an object composed of the inverted keys and values of object.
 * The iteratee is invoked with each value to produce the new keys.
 * Security: blocks __proto__ in new keys.
 */
export function invertBy(
  object: AnyObject,
  iteratee?: (value: unknown) => string
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const key of Object.keys(object)) {
    const value = iteratee ? iteratee(object[key]) : String(object[key]);
    if (DANGEROUS_KEYS.has(value)) continue;
    if (!result[value]) {
      result[value] = [];
    }
    result[value].push(key);
  }
  return result;
}

/** Returns an array of the enumerable property names of object. */
export function keys(object: AnyObject): string[] {
  if (object == null || typeof object !== 'object') return [];
  return Object.keys(object);
}

/**
 * Creates an object with the same values as object and keys generated
 * by running each own enumerable property through iteratee.
 */
export function mapKeys(
  object: AnyObject,
  iteratee: (value: unknown, key: string) => string
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(object)) {
    const newKey = iteratee(object[key], key);
    if (DANGEROUS_KEYS.has(newKey)) continue;
    result[newKey] = object[key];
  }
  return result;
}

/**
 * Creates an object with the same keys as object and values generated
 * by running each own enumerable property through iteratee.
 */
export function mapValues(
  object: AnyObject,
  iteratee: (value: unknown, key: string) => unknown
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(object)) {
    result[key] = iteratee(object[key], key);
  }
  return result;
}

/**
 * Deeply merges own enumerable properties of source objects into the destination object.
 * Security: blocks prototype pollution by checking all path segments.
 */
export function merge<T extends AnyObject>(object: T, ...sources: AnyObject[]): T {
  const result = { ...object } as AnyObject;
  for (const source of sources) {
    if (source == null || typeof source !== 'object') continue;
    mergeDeep(result, source);
  }
  return result as T;
}

function mergeDeep(target: AnyObject, source: AnyObject): void {
  for (const key of Object.keys(source)) {
    if (DANGEROUS_KEYS.has(key)) continue;
    const srcVal = source[key];
    const tgtVal = target[key];
    if (
      srcVal !== null &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      !(srcVal instanceof Date) &&
      !(srcVal instanceof RegExp) &&
      !(srcVal instanceof Map) &&
      !(srcVal instanceof Set) &&
      !(srcVal instanceof URL)
    ) {
      if (
        tgtVal !== null &&
        typeof tgtVal === 'object' &&
        !Array.isArray(tgtVal) &&
        !(tgtVal instanceof Date) &&
        !(tgtVal instanceof RegExp) &&
        !(tgtVal instanceof Map) &&
        !(tgtVal instanceof Set) &&
        !(tgtVal instanceof URL)
      ) {
        mergeDeep(tgtVal as AnyObject, srcVal as AnyObject);
        continue;
      }
      target[key] = { ...(srcVal as AnyObject) };
    } else if (Array.isArray(srcVal)) {
      if (Array.isArray(tgtVal)) {
        target[key] = [...tgtVal];
        for (let i = 0; i < srcVal.length; i++) {
          if (i < tgtVal.length) {
            if (
              srcVal[i] !== null &&
              typeof srcVal[i] === 'object' &&
              !Array.isArray(srcVal[i]) &&
              tgtVal[i] !== null &&
              typeof tgtVal[i] === 'object' &&
              !Array.isArray(tgtVal[i])
            ) {
              mergeDeep(tgtVal[i] as AnyObject, srcVal[i] as AnyObject);
            } else {
              (target[key] as unknown[])[i] = srcVal[i];
            }
          } else {
            (target[key] as unknown[])[i] = srcVal[i];
          }
        }
      } else {
        target[key] = [...srcVal];
      }
    } else {
      target[key] = srcVal;
    }
  }
}

/**
 * Creates an object composed of the own and inherited enumerable property paths
 * of object that are not omitted.
 */
export function omit<T extends AnyObject>(
  object: T,
  ...paths: (string | string[])[]
): Partial<T> {
  const result = { ...object } as AnyObject;
  const allPaths: (string | string[])[] = [];
  for (let i = 0; i < paths.length; i++) {
    allPaths.push(paths[i]);
  }
  const flatPaths: string[] = [];
  for (let i = 0; i < allPaths.length; i++) {
    const p = allPaths[i];
    if (Array.isArray(p)) {
      for (let j = 0; j < p.length; j++) {
        flatPaths.push(p[j]);
      }
    } else {
      flatPaths.push(p);
    }
  }
  for (const key of Object.keys(result)) {
    if (flatPaths.includes(key)) {
      delete result[key];
    }
  }
  return result as Partial<T>;
}

/**
 * Creates an object composed of the own and inherited enumerable properties
 * of object that predicate returns truthy for.
 */
export function omitBy<T extends AnyObject>(
  object: T,
  predicate: (value: unknown, key: string) => boolean
): Partial<T> {
  const result: AnyObject = {};
  for (const key of Object.keys(object)) {
    if (!predicate(object[key], key)) {
      result[key] = object[key];
    }
  }
  return result as Partial<T>;
}

/**
 * Creates an object composed of the picked object paths.
 */
export function pick<T extends AnyObject, K extends string>(
  object: T,
  ...paths: (K | K[])[]
): Pick<T, K> {
  const result: AnyObject = {};
  const flatPaths = paths.flat() as string[];
  for (const key of flatPaths) {
    if (DANGEROUS_KEYS.has(key)) continue;
    if (safeHasOwn(object, key)) {
      result[key] = object[key];
    }
  }
  return result as Pick<T, K>;
}

/**
 * Creates an object composed of the properties predicate returns truthy for.
 */
export function pickBy<T extends AnyObject>(
  object: T,
  predicate: (value: unknown, key: string) => boolean
): Partial<T> {
  const result: AnyObject = {};
  for (const key of Object.keys(object)) {
    if (predicate(object[key], key)) {
      result[key] = object[key];
    }
  }
  return result as Partial<T>;
}

/**
 * Resolves the value at the path of object. If the resolved value is a function,
 * it's invoked with the object as context and its result is returned.
 */
export function result<TDefault = unknown>(
  object: AnyObject,
  path: string | string[],
  defaultValue?: TDefault
): unknown | TDefault {
  const value = get(object, path);
  if (value === undefined) return defaultValue;
  if (typeof value === 'function') {
    return value.call(object);
  }
  return value;
}

/**
 * Sets the value at the path of object. If a portion of the path doesn't exist,
 * it's created.
 * Security: blocks __proto__/constructor/prototype pollution.
 */
export function set<T extends AnyObject>(
  object: T,
  path: string | string[],
  value: unknown
): T {
  const segments = typeof path === 'string' ? parsePath(path) : path.map(String);
  let current: AnyObject = object as AnyObject;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (DANGEROUS_KEYS.has(segment)) return object; // Block dangerous path
    if (i === segments.length - 1) {
      current[segment] = value;
    } else {
      const nextSegment = segments[i + 1];
      const nextIsArrayIndex = /^\d+$/.test(nextSegment);
      if (
        current[segment] == null ||
        typeof current[segment] !== 'object'
      ) {
        current[segment] = nextIsArrayIndex ? [] : {};
      }
      current = current[segment] as AnyObject;
    }
  }
  return object;
}

type Pair = [string, unknown];

/**
 * Creates an array of [key, value] pairs for own enumerable properties.
 */
export function toPairs(object: AnyObject): Pair[] {
  const result: Pair[] = [];
  for (const key of Object.keys(object)) {
    result.push([key, object[key]]);
  }
  return result;
}

/**
 * Creates an array of [key, value] pairs for own and inherited enumerable properties.
 */
export function toPairsIn(object: AnyObject): Pair[] {
  const result: Pair[] = [];
  for (const key in object) {
    if (DANGEROUS_KEYS.has(key)) continue;
    result.push([key, object[key]]);
  }
  return result;
}

/**
 * An alternative to _.reduce for objects. Transform iteratee receives
 * (accumulator, value, key, object) and mutates accumulator.
 */
export function transform<TAccumulator extends AnyObject = AnyObject>(
  object: AnyObject,
  iteratee: (
    accumulator: TAccumulator,
    value: unknown,
    key: string,
    object: AnyObject
  ) => void,
  accumulator?: TAccumulator
): TAccumulator {
  const acc = (accumulator ?? {}) as TAccumulator;
  for (const key of Object.keys(object)) {
    iteratee(acc, object[key], key, object);
  }
  return acc;
}

/** Returns an array of the enumerable property values of object. */
export function values(object: AnyObject): unknown[] {
  if (object == null || typeof object !== 'object') return [];
  return Object.values(object);
}

/** Returns an array of the own and inherited enumerable property values of object. */
export function valuesIn(object: AnyObject): unknown[] {
  const result: unknown[] = [];
  for (const key in object) {
    if (DANGEROUS_KEYS.has(key)) continue;
    result.push(object[key]);
  }
  return result;
}
