// Helios Collection Functions
// A Lodash-alternative collection library
// All functions are self-contained with NO external imports.
// Uses simple for loops for performance (no .reduce, .map, .filter in implementations).
// Security: blocks __proto__/constructor/prototype access, never uses 'in' operator.

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

type Collection<T = any> = T[] | ArrayLike<T> | Record<string, T> | string | Map<any, T> | Set<T>;
type Iteratee<T = any, R = any> = ((value: T, index: any, collection: any) => R) | string | number | symbol;
type Predicate<T = any> = ((value: T, index: any, collection: any) => boolean) | Partial<T> | [keyof T, any] | string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = string | number | symbol | (string | number | symbol)[];

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Safe hasOwnProperty check — never uses the 'in' operator. */
function hasOwn(obj: any, key: string | number | symbol): boolean {
  if (obj == null) return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/** Block dangerous keys from being set as object keys. */
function isSafeKey(key: string): boolean {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

/** Ensure a value is an array. */
function toArray(value: any): any[] {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    // Split string into array of chars (handle surrogate pairs)
    const result: string[] = [];
    let i = 0;
    const len = value.length;
    while (i < len) {
      const codePoint = value.codePointAt(i);
      if (codePoint === undefined) {
        result.push(value[i]);
        i++;
      } else if (codePoint > 0xffff) {
        result.push(String.fromCodePoint(codePoint));
        i += 2;
      } else {
        result.push(value[i]);
        i++;
      }
    }
    return result;
  }
  if (value instanceof Map || value instanceof Set) {
    return Array.from(value);
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const result: any[] = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      result.push(value[key]);
    }
    return result;
  }
  return [];
}

/** Resolve an iteratee (function, property key, or object matcher) into a function. */
function resolveIteratee<T, R>(iteratee: Iteratee<T, R>): (value: T, index: any, collection: any) => R {
  if (iteratee == null) {
    return ((v: any) => v) as any;
  }
  if (typeof iteratee === 'function') {
    return iteratee as (value: T, index: any, collection: any) => R;
  }
  if (Array.isArray(iteratee)) {
    // [key, value] matcher — check if property matches value
    const key = iteratee[0];
    const val = iteratee[1];
    return ((obj: any) => {
      return hasOwn(obj, key as any) && obj[key as any] === val ? (true as any) : (false as any);
    }) as any;
  }
  if (typeof iteratee === 'object') {
    // Partial object matcher — check if all properties match
    return ((obj: any) => {
      if (obj == null || typeof obj !== 'object') return false as any;
      const keys = Object.keys(iteratee as any);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (!isSafeKey(k)) continue;
        const expected = (iteratee as any)[k];
        if (!hasOwn(obj, k) || obj[k] !== expected) return false as any;
      }
      return true as any;
    }) as any;
  }
  // Property key
  const propKey = iteratee as string;
  return ((obj: any) => {
    if (obj == null) return undefined as any;
    return obj[propKey];
  }) as any;
}

/** Resolve a predicate (function, partial object, [key, value], property key) into a function. */
function resolvePredicate<T>(predicate: Predicate<T>): (value: T, index: any, collection: any) => boolean {
  if (predicate == null) {
    return ((v: any) => !!v) as any;
  }
  if (typeof predicate === 'function') {
    return predicate as (value: T, index: any, collection: any) => boolean;
  }
  if (Array.isArray(predicate)) {
    const key = predicate[0];
    const val = predicate[1];
    return ((obj: any) => {
      if (obj == null) return false;
      return hasOwn(obj, key as string) && obj[key as string] === val;
    }) as any;
  }
  if (typeof predicate === 'object' && predicate !== null) {
    return ((obj: any) => {
      if (obj == null || typeof obj !== 'object') return false;
      const keys = Object.keys(predicate as any);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (!isSafeKey(k)) continue;
        const expected = (predicate as any)[k];
        if (!hasOwn(obj, k) || obj[k] !== expected) return false;
      }
      return true;
    }) as any;
  }
  // Property key — check truthy
  const propKey = predicate as string;
  return ((obj: any) => {
    if (obj == null) return false;
    return !!obj[propKey];
  }) as any;
}

/** Flatten array one level. */
function flattenOnce(arr: any[]): any[] {
  const result: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      for (let j = 0; j < item.length; j++) {
        result.push(item[j]);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

/** Flatten array deeply. */
function flattenDeep(arr: any[]): any[] {
  const result: any[] = [];
  function recurse(items: any[]): void {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (Array.isArray(item)) {
        recurse(item);
      } else {
        result.push(item);
      }
    }
  }
  recurse(arr);
  return result;
}

/** Flatten array to a specific depth. */
function flattenDepth(arr: any[], depth: number): any[] {
  if (depth <= 0) return arr.slice();
  const result: any[] = [];
  function recurse(items: any[], currentDepth: number): void {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (Array.isArray(item) && currentDepth < depth) {
        recurse(item, currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  }
  recurse(arr, 0);
  return result;
}

/** Get a value from an object by property path (e.g., "a.b.c" or ["a","b","c"]). */
function getByPath(obj: any, path: PropertyPath, defaultValue?: any): any {
  if (obj == null) return defaultValue;
  const keys = Array.isArray(path) ? path : stringToPath(path as string);
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (current == null) return defaultValue;
    const key = keys[i];
    if (typeof key === 'string' && !isSafeKey(key)) return defaultValue;
    current = current[key];
  }
  return current !== undefined ? current : defaultValue;
}

/** Convert a dot/bracket notation string to a path array. */
function stringToPath(str: string): (string | number)[] {
  const result: (string | number)[] = [];
  let current = '';
  let inBrackets = false;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const ch = str[i];
    if (ch === '[') {
      if (current) {
        result.push(current);
        current = '';
      }
      inBrackets = true;
    } else if (ch === ']') {
      if (current) {
        result.push(current);
        current = '';
      }
      inBrackets = false;
    } else if (ch === '.' && !inBrackets) {
      if (current) {
        result.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }
  if (current) {
    result.push(current);
  }
  return result;
}

/** Fisher-Yates shuffle (in-place on a copy). */
function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = arr.slice();
  const len = result.length;
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/** Internal iteratee resolution that wraps property paths for map-like operations. */
function resolveMapIteratee<T, R>(iteratee: Iteratee<T, R>): (value: T, index: any, collection: any) => R {
  if (iteratee == null) {
    return ((v: any) => v) as any;
  }
  if (typeof iteratee === 'function') {
    return iteratee as (value: T, index: any, collection: any) => R;
  }
  // Property key (string, number, symbol)
  const key = iteratee as string;
  return ((obj: any) => {
    if (obj == null) return undefined as any;
    return getByPath(obj, key);
  }) as any;
}

/** Internal iteratee resolution that wraps property paths for sortBy/orderBy. */
function resolveSortIteratee<T>(iteratee: Iteratee<T, any>): (value: T) => any {
  if (iteratee == null) {
    return ((v: any) => v) as any;
  }
  if (typeof iteratee === 'function') {
    return iteratee as (value: T) => any;
  }
  const key = iteratee as string;
  return ((obj: any) => {
    if (obj == null) return undefined;
    return getByPath(obj, key);
  }) as any;
}

// ---------------------------------------------------------------------------
// 1. countBy
// ---------------------------------------------------------------------------

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns The composed aggregate object.
 */
export function countBy<T>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, any>
): Record<string, number> {
  const result: Record<string, number> = {};
  if (collection == null) return result;

  const fn = resolveIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    const key = String(fn(items[i], i, collection));
    if (!isSafeKey(key)) continue;
    if (hasOwn(result, key)) {
      result[key] = result[key] + 1;
    } else {
      result[key] = 1;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 2. forEach
// ---------------------------------------------------------------------------

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * Returns the collection.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the collection.
 */
export function forEach<T>(
  collection: Collection<T>,
  iteratee?: ((value: T, index: any, collection: any) => void) | Iteratee<T, any>
): Collection<T> {
  if (collection == null) return collection;

  const fn = typeof iteratee === 'function' ? iteratee : (_v: any, _k: any, _c: any) => {};

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      fn(collection[i], i, collection);
    }
  } else if (typeof collection === 'string') {
    for (let i = 0; i < collection.length; i++) {
      fn(collection[i] as any, i, collection);
    }
  } else if (collection instanceof Map) {
    let idx = 0;
    collection.forEach((value, key) => {
      fn(value, key, collection);
      idx++;
    });
  } else if (collection instanceof Set) {
    let idx = 0;
    collection.forEach((value) => {
      fn(value, idx, collection);
      idx++;
    });
  } else if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      fn((collection as any)[key], key, collection);
    }
  }

  return collection;
}

// ---------------------------------------------------------------------------
// 3. forEachRight
// ---------------------------------------------------------------------------

/**
 * Iterates over elements of `collection` from right to left.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the collection.
 */
export function forEachRight<T>(
  collection: Collection<T>,
  iteratee?: ((value: T, index: any, collection: any) => void) | Iteratee<T, any>
): Collection<T> {
  if (collection == null) return collection;

  const fn = typeof iteratee === 'function' ? iteratee : (_v: any, _k: any, _c: any) => {};

  if (Array.isArray(collection)) {
    for (let i = collection.length - 1; i >= 0; i--) {
      fn(collection[i], i, collection);
    }
  } else if (typeof collection === 'string') {
    for (let i = collection.length - 1; i >= 0; i--) {
      fn(collection[i] as any, i, collection);
    }
  } else if (collection instanceof Map) {
    // Map preserves insertion order, iterate in reverse
    const entries = Array.from(collection.entries());
    for (let i = entries.length - 1; i >= 0; i--) {
      fn(entries[i][1], entries[i][0], collection);
    }
  } else if (collection instanceof Set) {
    const values = Array.from(collection);
    for (let i = values.length - 1; i >= 0; i--) {
      fn(values[i], i, collection);
    }
  } else if (typeof collection === 'object' && collection !== null) {
    const keys = Object.keys(collection);
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      fn((collection as any)[key], key, collection);
    }
  }

  return collection;
}

// ---------------------------------------------------------------------------
// 4. every
// ---------------------------------------------------------------------------

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns a falsy value.
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns `true` if all elements pass the predicate check.
 */
export function every<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>
): boolean {
  if (collection == null) return true;

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    if (!fn(items[i], i, collection)) {
      return false;
    }
  }

  return true;
}

// ---------------------------------------------------------------------------
// 5. filter
// ---------------------------------------------------------------------------

/**
 * Iterates over `collection`, returning an array of all elements `predicate`
 * returns truthy for.
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 */
export function filter<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>
): T[] {
  if (collection == null) return [];

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);
  const result: T[] = [];

  for (let i = 0; i < items.length; i++) {
    if (fn(items[i], i, collection)) {
      result.push(items[i]);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 6. find
// ---------------------------------------------------------------------------

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for.
 *
 * @param collection The collection to inspect.
 * @param predicate The function invoked per iteration.
 * @param fromIndex The index to start searching from.
 * @returns Returns the matched element, else `undefined`.
 */
export function find<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>,
  fromIndex: number = 0
): T | undefined {
  if (collection == null) return undefined;

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);
  const start = Math.max(0, fromIndex);

  for (let i = start; i < items.length; i++) {
    if (fn(items[i], i, collection)) {
      return items[i];
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// 7. findLast
// ---------------------------------------------------------------------------

/**
 * Iterates over elements of `collection` from right to left, returning
 * the last element `predicate` returns truthy for.
 *
 * @param collection The collection to inspect.
 * @param predicate The function invoked per iteration.
 * @param fromIndex The index to start searching from (optional).
 * @returns Returns the matched element, else `undefined`.
 */
export function findLast<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>,
  fromIndex?: number
): T | undefined {
  if (collection == null) return undefined;

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);

  const start = fromIndex !== undefined
    ? Math.min(fromIndex, items.length - 1)
    : items.length - 1;

  for (let i = start; i >= 0; i--) {
    if (fn(items[i], i, collection)) {
      return items[i];
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// 8. flatMap
// ---------------------------------------------------------------------------

/**
 * Creates a flattened array of values by running each element in `collection`
 * through `iteratee` and flattening the mapped results by one level.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new flattened array.
 */
export function flatMap<T, R = any>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, R | R[]>
): R[] {
  if (collection == null) return [];

  const fn = resolveMapIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);
  const mapped: any[] = [];

  for (let i = 0; i < items.length; i++) {
    mapped.push(fn(items[i], i, collection));
  }

  return flattenOnce(mapped);
}

// ---------------------------------------------------------------------------
// 9. flatMapDeep
// ---------------------------------------------------------------------------

/**
 * Creates a flattened array by running each element through `iteratee`
 * and flattening the mapped results deeply.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new flattened array.
 */
export function flatMapDeep<T, R = any>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, R | R[]>
): R[] {
  if (collection == null) return [];

  const fn = resolveMapIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);
  const mapped: any[] = [];

  for (let i = 0; i < items.length; i++) {
    mapped.push(fn(items[i], i, collection));
  }

  return flattenDeep(mapped);
}

// ---------------------------------------------------------------------------
// 10. flatMapDepth
// ---------------------------------------------------------------------------

/**
 * Creates a flattened array by running each element through `iteratee`
 * and flattening the mapped results to a specific `depth`.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param depth The maximum flatten depth (default: 1).
 * @returns Returns the new flattened array.
 */
export function flatMapDepth<T, R = any>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, R | R[]>,
  depth: number = 1
): R[] {
  if (collection == null) return [];

  const fn = resolveMapIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);
  const mapped: any[] = [];

  for (let i = 0; i < items.length; i++) {
    mapped.push(fn(items[i], i, collection));
  }

  return flattenDepth(mapped, depth);
}

// ---------------------------------------------------------------------------
// 11. groupBy
// ---------------------------------------------------------------------------

/**
 * Creates an object composed of keys generated from the results of running
 * each element through `iteratee`. The order of grouped values is determined
 * by the order they occur in `collection`.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns The composed aggregate object.
 */
export function groupBy<T>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, any>
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  if (collection == null) return result;

  const fn = resolveIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    const key = String(fn(items[i], i, collection));
    if (!isSafeKey(key)) continue;
    if (hasOwn(result, key)) {
      result[key].push(items[i]);
    } else {
      result[key] = [items[i]];
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 12. includes
// ---------------------------------------------------------------------------

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's
 * checked for a substring. Uses SameValueZero for equality.
 *
 * @param collection The collection to inspect.
 * @param value The value to search for.
 * @param fromIndex The index to start searching from.
 * @returns `true` if `value` is found, else `false`.
 */
export function includes<T>(
  collection: Collection<T>,
  value: any,
  fromIndex: number = 0
): boolean {
  if (collection == null) return false;

  if (typeof collection === 'string') {
    if (typeof value !== 'string') return false;
    return collection.indexOf(value, fromIndex) !== -1;
  }

  if (collection instanceof Map) {
    return collection.has(value);
  }

  if (collection instanceof Set) {
    return collection.has(value);
  }

  const items = toArray(collection);
  const start = Math.max(0, fromIndex);

  for (let i = start; i < items.length; i++) {
    // SameValueZero comparison (like Object.is but treating -0 === +0)
    if (items[i] === value || (value !== value && items[i] !== items[i])) {
      return true;
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// 13. invokeMap
// ---------------------------------------------------------------------------

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results.
 *
 * @param collection The collection to iterate over.
 * @param path The path of the method to invoke (string, number, symbol, or array).
 * @param args The arguments to invoke the method with.
 * @returns Returns the array of results.
 */
export function invokeMap<T, R = any>(
  collection: Collection<T>,
  path: PropertyPath,
  ...args: any[]
): R[] {
  if (collection == null) return [];

  const items = toArray(collection);
  const result: R[] = [];

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element == null) {
      result.push(undefined as any);
      continue;
    }

    const method = Array.isArray(path)
      ? getByPath(element, path)
      : getByPath(element, path);

    if (typeof method === 'function') {
      result.push(method.apply(element, args));
    } else {
      result.push(undefined as any);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 14. keyBy
// ---------------------------------------------------------------------------

/**
 * Creates an object composed of keys generated from the results of running
 * each element through `iteratee`. The corresponding value of each key is
 * the last element responsible for generating the key.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns The composed aggregate object.
 */
export function keyBy<T>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, any>
): Record<string, T> {
  const result: Record<string, T> = {};
  if (collection == null) return result;

  const fn = resolveIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    const key = String(fn(items[i], i, collection));
    if (!isSafeKey(key)) continue;
    result[key] = items[i];
  }

  return result;
}

// ---------------------------------------------------------------------------
// 15. map
// ---------------------------------------------------------------------------

/**
 * Creates an array of values by running each element in `collection`
 * through `iteratee`.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new mapped array.
 */
export function map<T, R = any>(
  collection: Collection<T>,
  iteratee?: Iteratee<T, R>
): R[] {
  if (collection == null) return [];

  const fn = resolveMapIteratee(iteratee || ((v: any) => v));
  const items = toArray(collection);
  const result: R[] = [];

  for (let i = 0; i < items.length; i++) {
    result.push(fn(items[i], i, collection));
  }

  return result;
}

// ---------------------------------------------------------------------------
// 16. orderBy
// ---------------------------------------------------------------------------

/**
 * Creates an array of elements, sorted as specified by `iteratees` and
 * `orders` (asc/desc). Like `sortBy` but allows sort order specification.
 *
 * @param collection The collection to iterate over.
 * @param iteratees The iteratees to sort by.
 * @param orders The sort orders ("asc" or "desc").
 * @returns Returns the new sorted array.
 */
export function orderBy<T>(
  collection: Collection<T>,
  iteratees?: Many<Iteratee<T, any>>,
  orders?: Many<'asc' | 'desc'>
): T[] {
  if (collection == null) return [];

  const items = toArray(collection);
  if (items.length === 0) return [];

  // Normalize iteratees to array of functions
  let iterateeFns: ((value: T) => any)[];

  if (iteratees == null) {
    iterateeFns = [(v: any) => v];
  } else if (Array.isArray(iteratees)) {
    iterateeFns = iteratees.map(resolveSortIteratee);
  } else {
    iterateeFns = [resolveSortIteratee(iteratees)];
  }

  // Normalize orders
  let orderArr: ('asc' | 'desc')[];
  if (orders == null) {
    orderArr = iterateeFns.map(() => 'asc');
  } else if (Array.isArray(orders)) {
    orderArr = orders;
  } else {
    orderArr = [orders];
  }

  // Create a copy and sort
  const result = items.slice();

  result.sort((a, b) => {
    for (let i = 0; i < iterateeFns.length; i++) {
      const valA = iterateeFns[i](a);
      const valB = iterateeFns[i](b);
      const isDesc = orderArr[i] === 'desc';

      // Handle null/undefined
      if (valA == null && valB == null) continue;
      if (valA == null) return isDesc ? 1 : -1;
      if (valB == null) return isDesc ? -1 : 1;

      // String comparison
      if (typeof valA === 'string' && typeof valB === 'string') {
        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        continue;
      }

      // Number comparison
      if (valA < valB) return isDesc ? 1 : -1;
      if (valA > valB) return isDesc ? -1 : 1;
    }
    return 0;
  });

  return result;
}

// ---------------------------------------------------------------------------
// 17. partition
// ---------------------------------------------------------------------------

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsy for.
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the array of grouped elements.
 */
export function partition<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  if (collection == null) return [truthy, falsy];

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    if (fn(items[i], i, collection)) {
      truthy.push(items[i]);
    } else {
      falsy.push(items[i]);
    }
  }

  return [truthy, falsy];
}

// ---------------------------------------------------------------------------
// 18. reduce
// ---------------------------------------------------------------------------

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element through `iteratee`, where each successive invocation is
 * supplied the return value of the previous.
 *
 * @param collection The collection to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param accumulator The initial value. If not provided, the first element is used.
 * @returns Returns the accumulated value.
 */
export function reduce<T, R = any>(
  collection: Collection<T>,
  iteratee: (accumulator: R, value: T, index: any, collection: any) => R,
  accumulator?: R
): R {
  if (collection == null && accumulator === undefined) {
    throw new Error('reduce of empty collection with no initial value');
  }
  if (collection == null) return accumulator as R;

  const items = toArray(collection);
  let acc: R;
  let startIndex: number;

  if (accumulator === undefined) {
    if (items.length === 0) {
      throw new Error('reduce of empty collection with no initial value');
    }
    acc = items[0] as any;
    startIndex = 1;
  } else {
    acc = accumulator;
    startIndex = 0;
  }

  for (let i = startIndex; i < items.length; i++) {
    acc = iteratee(acc, items[i], i, collection);
  }

  return acc;
}

// ---------------------------------------------------------------------------
// 19. reject
// ---------------------------------------------------------------------------

/**
 * The opposite of `filter`; returns the elements of `collection` that
 * `predicate` does **not** return truthy for.
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 */
export function reject<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>
): T[] {
  if (collection == null) return [];

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);
  const result: T[] = [];

  for (let i = 0; i < items.length; i++) {
    if (!fn(items[i], i, collection)) {
      result.push(items[i]);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// 20. sample
// ---------------------------------------------------------------------------

/**
 * Gets a random element from `collection`.
 *
 * @param collection The collection to sample.
 * @returns Returns the random element.
 */
export function sample<T>(collection: Collection<T>): T | undefined {
  if (collection == null) return undefined;

  const items = toArray(collection);
  const len = items.length;
  if (len === 0) return undefined;

  const index = Math.floor(Math.random() * len);
  return items[index];
}

// ---------------------------------------------------------------------------
// 21. sampleSize
// ---------------------------------------------------------------------------

/**
 * Gets `n` random elements at unique keys from `collection`.
 *
 * @param collection The collection to sample.
 * @param n The number of elements to sample (default: 1).
 * @returns Returns the random elements.
 */
export function sampleSize<T>(
  collection: Collection<T>,
  n: number = 1
): T[] {
  if (collection == null) return [];

  const items = toArray(collection);
  const len = items.length;
  if (len === 0 || n <= 0) return [];

  const count = Math.min(n, len);
  const indices: number[] = [];
  for (let i = 0; i < len; i++) {
    indices.push(i);
  }

  // Fisher-Yates partial shuffle — only shuffle first `count` positions
  const shuffled = items.slice();
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (len - i));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(shuffled[i]);
  }

  return result;
}

// ---------------------------------------------------------------------------
// 22. shuffle
// ---------------------------------------------------------------------------

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates
 * shuffle.
 *
 * @param collection The collection to shuffle.
 * @returns Returns the new shuffled array.
 */
export function shuffle<T>(collection: Collection<T>): T[] {
  if (collection == null) return [];

  const items = toArray(collection);
  return fisherYatesShuffle(items);
}

// ---------------------------------------------------------------------------
// 23. size
// ---------------------------------------------------------------------------

/**
 * Gets the size of `collection` by returning the number of own enumerable
 * properties.
 *
 * @param collection The collection to inspect.
 * @returns Returns the collection size.
 */
export function size(collection: Collection<any>): number {
  if (collection == null) return 0;

  if (Array.isArray(collection)) {
    return collection.length;
  }

  if (typeof collection === 'string') {
    // Count code points (handle surrogate pairs like Lodash)
    let count = 0;
    let i = 0;
    const len = collection.length;
    while (i < len) {
      const code = collection.codePointAt(i);
      if (code !== undefined && code > 0xffff) {
        i += 2;
      } else {
        i++;
      }
      count++;
    }
    return count;
  }

  if (collection instanceof Map || collection instanceof Set) {
    return collection.size;
  }

  if (typeof collection === 'object' && collection !== null) {
    return Object.keys(collection).length;
  }

  return 0;
}

// ---------------------------------------------------------------------------
// 24. some
// ---------------------------------------------------------------------------

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns a truthy value.
 *
 * @param collection The collection to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns `true` if any element passes the predicate check.
 */
export function some<T>(
  collection: Collection<T>,
  predicate?: Predicate<T>
): boolean {
  if (collection == null) return false;

  const fn = resolvePredicate(predicate || ((v: any) => !!v));
  const items = toArray(collection);

  for (let i = 0; i < items.length; i++) {
    if (fn(items[i], i, collection)) {
      return true;
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// 25. sortBy
// ---------------------------------------------------------------------------

/**
 * Creates an array of elements, sorted in ascending order by the results
 * of running each element through `iteratees`.
 *
 * @param collection The collection to iterate over.
 * @param iteratees The iteratees to sort by.
 * @returns Returns the new sorted array.
 */
export function sortBy<T>(
  collection: Collection<T>,
  ...iteratees: (Iteratee<T, any> | Iteratee<T, any>[])[]
): T[] {
  if (collection == null) return [];

  const items = toArray(collection);
  if (items.length === 0) return [];

  // Flatten and normalize iteratees
  const flatIteratees: Iteratee<T, any>[] = [];
  for (let i = 0; i < iteratees.length; i++) {
    const it = iteratees[i];
    if (Array.isArray(it)) {
      for (let j = 0; j < it.length; j++) {
        flatIteratees.push(it[j]);
      }
    } else if (it != null) {
      flatIteratees.push(it);
    }
  }

  if (flatIteratees.length === 0) {
    flatIteratees.push(((v: any) => v) as any);
  }

  const fns = flatIteratees.map(resolveSortIteratee);

  // Create a copy and sort
  const result = items.slice();

  result.sort((a, b) => {
    for (let i = 0; i < fns.length; i++) {
      const valA = fns[i](a);
      const valB = fns[i](b);

      // Handle null/undefined
      if (valA == null && valB == null) continue;
      if (valA == null) return -1;
      if (valB == null) return 1;

      // String comparison
      if (typeof valA === 'string' && typeof valB === 'string') {
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        continue;
      }

      // Number comparison
      if (valA < valB) return -1;
      if (valA > valB) return 1;
    }
    return 0;
  });

  return result;
}
