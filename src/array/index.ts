/**
 * Creates an array of elements split into groups of `size`.
 */
export function chunk<T>(array: T[], size: number = 1): T[][] {
  if (!array?.length || size < 1) return [];
  
  const len = array.length;
  const result: T[][] = [];
  let i = 0;
  
  while (i < len) {
    result.push(array.slice(i, i + size));
    i += size;
  }
  
  return result;
}

/**
 * Creates an array with all falsy values removed.
 */
export function compact<T>(array: (T | false | null | undefined | 0 | '')[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    if (val) result.push(val as T);
  }
  return result;
}

/**
 * Creates a new array concatenating additional values.
 */
export function concat<T>(array: T[], ...values: any[]): T[] {
  const result = array.slice();
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    if (Array.isArray(val)) {
      for (let j = 0; j < val.length; j++) {
        result.push(val[j]);
      }
    } else {
      result.push(val);
    }
  }
  return result;
}

/**
 * Creates an array of unique values not in the other array.
 */
export function difference<T>(array: T[], ...values: T[][]): T[] {
  const exclude = new Set<T>();
  for (let v = 0; v < values.length; v++) {
    const arr = values[v];
    if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; i++) exclude.add(arr[i]);
    }
  }
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (!exclude.has(array[i])) result.push(array[i]);
  }
  return result;
}

/**
 * Creates an array of unique values not in others, using an iteratee.
 */
export function differenceBy<T>(array: T[], ...args: any[]): T[] {
  const iteratee = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const values = args;
  
  const mapped = new Map<any, T>();
  for (const arr of values) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        mapped.set(iteratee ? iteratee(item) : item, item);
      }
    }
  }
  
  return array.filter(item => !mapped.has(iteratee ? iteratee(item) : item));
}

/**
 * Creates an array of unique values not in others, using a comparator.
 */
export function differenceWith<T>(array: T[], ...args: any[]): T[] {
  const comparator = typeof args[args.length - 1] === 'function' ? args.pop() : (a: T, b: T) => a === b;
  const values = args.flat() as T[];
  
  return array.filter(item =>
    !values.some(other => comparator(item, other))
  );
}

/**
 * Creates a slice of array with `n` elements dropped from the beginning.
 */
export function drop<T>(array: T[], n: number = 1): T[] {
  return array.slice(Math.min(n, array.length));
}

/**
 * Creates a slice of array with `n` elements dropped from the end.
 */
export function dropRight<T>(array: T[], n: number = 1): T[] {
  return n >= array.length ? [] : array.slice(0, array.length - n);
}

/**
 * Creates a slice of array dropping elements from the beginning while predicate returns truthy.
 */
export function dropWhile<T>(array: T[], predicate: (value: T, index: number, array: T[]) => any): T[] {
  let i = 0;
  while (i < array.length && predicate(array[i], i, array)) i++;
  return array.slice(i);
}

/**
 * Creates a slice of array dropping elements from the end while predicate returns truthy.
 */
export function dropRightWhile<T>(array: T[], predicate: (value: T, index: number, array: T[]) => any): T[] {
  let i = array.length - 1;
  while (i >= 0 && predicate(array[i], i, array)) i--;
  return array.slice(0, i + 1);
}

/**
 * Fills elements of array with `value` from `start` up to `end`.
 */
export function fill<T>(array: any[], value: T, start: number = 0, end?: number): T[] {
  const len = array.length;
  const e = end ?? len;
  const s = Math.max(0, start < 0 ? len + start : Math.min(start, len));
  const finalEnd = Math.max(0, e < 0 ? len + e : Math.min(e, len));
  
  for (let i = s; i < finalEnd; i++) {
    array[i] = value;
  }
  return array;
}

/**
 * Returns the first element of an array.
 */
export function head<T>(array: T[]): T | undefined {
  return array?.length ? array[0] : undefined;
}

/**
 * Gets the index at which the first occurrence of value is found.
 */
export function indexOf<T>(array: T[], value: T, fromIndex: number = 0): number {
  const len = array.length;
  if (len === 0) return -1;
  
  let start = fromIndex >= 0 ? fromIndex : Math.max(0, len + fromIndex);
  
  for (let i = start; i < len; i++) {
    if (array[i] === value || (value !== value && array[i] !== array[i])) return i;
  }
  return -1;
}

/**
 * Gets all but the last element of array.
 */
export function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}

/**
 * Creates an array of unique values that are included in all given arrays.
 */
export function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  const first = arrays[0];
  const rest = arrays.slice(1);
  
  return first.filter(item =>
    rest.every(arr => arr.indexOf(item) !== -1)
  );
}

/**
 * Joins array elements into a string.
 */
export function join(array: any[], separator: string = ','): string {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    if (i > 0) result += separator;
    result += array[i] == null ? '' : String(array[i]);
  }
  return result;
}

/**
 * Gets the last element of array.
 */
export function last<T>(array: T[]): T | undefined {
  return array?.length ? array[array.length - 1] : undefined;
}

/**
 * Gets the index at which the last occurrence of value is found.
 */
export function lastIndexOf<T>(array: T[], value: T, fromIndex?: number): number {
  const len = array.length;
  if (len === 0) return -1;
  
  let start = fromIndex === undefined ? len - 1 : (fromIndex >= 0 ? Math.min(fromIndex, len - 1) : len + fromIndex);
  
  for (let i = start; i >= 0; i--) {
    if (array[i] === value) return i;
  }
  return -1;
}

/**
 * Gets the element at index n of array. Supports negative indexing.
 */
export function nth<T>(array: T[], n: number = 0): T | undefined {
  return n < 0 ? array[array.length + n] : array[n];
}

/**
 * Removes all given values from array.
 * Mutates the array in place and returns the removed elements.
 */
export function pull<T>(array: T[], ...values: T[]): T[] {
  const removed: T[] = [];
  const set = new Set(values);
  let writeIdx = 0;
  
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      removed.push(array[i]);
    } else {
      array[writeIdx++] = array[i];
    }
  }
  array.length = writeIdx;
  return removed;
}

/**
 * Removes all provided values from array using SameValueZero comparison.
 */
export function pullAll<T>(array: T[], values: T[]): T[] {
  return pull(array, ...values);
}

/**
 * Removes elements from array at specified indexes.
 * Returns the removed elements.
 */
export function pullAt<T>(array: T[], ...indexes: number[]): T[] {
  const removed: T[] = [];
  const indices = indexes.slice().sort((a, b) => b - a); // descending to avoid index shifting
  
  for (const idx of indices) {
    if (idx >= 0 && idx < array.length) {
      removed.unshift(array.splice(idx, 1)[0]);
    }
  }
  
  return removed;
}

/**
 * Removes elements from array that predicate returns truthy for.
 * Mutates the array and returns the removed elements.
 */
export function remove<T>(array: T[], predicate: (value: T, index: number, array: T[]) => any): T[] {
  const removed: T[] = [];
  let writeIdx = 0;
  
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      removed.push(array[i]);
    } else {
      array[writeIdx++] = array[i];
    }
  }
  array.length = writeIdx;
  return removed;
}

/**
 * Reverses array in place and returns it.
 */
export function reverse<T>(array: T[]): T[] {
  let left = 0;
  let right = array.length - 1;
  
  while (left < right) {
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;
    left++;
    right--;
  }
  
  return array;
}

/**
 * Creates a slice of array from start up to, but not including, end.
 */
export function slice<T>(array: T[], start?: number, end?: number): T[] {
  const len = array.length;
  const s = start ?? 0;
  const e = end ?? len;
  
  const resultStart = s < 0 ? Math.max(len + s, 0) : Math.min(s, len);
  const resultEnd = e < 0 ? Math.max(len + e, 0) : Math.min(e, len);
  
  const result: T[] = [];
  for (let i = resultStart; i < resultEnd; i++) {
    result.push(array[i]);
  }
  return result;
}

/**
 * Uses a binary search to determine the lowest index at which value should be inserted
 * to maintain sorted order.
 */
export function sortedIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid] < value) low = mid + 1;
    else high = mid;
  }
  return low;
}

/**
 * Uses a binary search with iteratee to determine the lowest index.
 */
export function sortedIndexBy<T>(array: T[], value: T, iteratee: (val: T) => any): number {
  const valMapped = iteratee(value);
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (iteratee(array[mid]) < valMapped) low = mid + 1;
    else high = mid;
  }
  return low;
}

/**
 * Returns a sorted array of unique values.
 */
export function sortedUniq<T>(array: T[]): T[] {
  if (array.length <= 1) return array.slice();
  
  const result: T[] = [array[0]];
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1]) result.push(array[i]);
  }
  return result;
}

/**
 * Returns all but the first element of array.
 */
export function tail<T>(array: T[]): T[] {
  return array.slice(1);
}

/**
 * Creates a slice of array with n elements taken from the beginning.
 */
export function take<T>(array: T[], n: number = 1): T[] {
  return array.slice(0, Math.max(0, n));
}

/**
 * Creates a slice of array with n elements taken from the end.
 */
export function takeRight<T>(array: T[], n: number = 1): T[] {
  return n <= 0 ? [] : array.slice(-n);
}

/**
 * Creates a slice taken from the end while predicate returns truthy.
 */
export function takeWhile<T>(array: T[], predicate: (value: T, index: number) => any): T[] {
  let i = 0;
  while (i < array.length && predicate(array[i], i)) i++;
  return array.slice(0, i);
}

/**
 * Creates a slice taken from the end while predicate returns truthy.
 */
export function takeRightWhile<T>(array: T[], predicate: (value: T, index: number) => any): T[] {
  let i = array.length - 1;
  while (i >= 0 && predicate(array[i], i)) i--;
  return array.slice(i + 1);
}

/**
 * Creates an array of unique values, in order, from all given arrays.
 */
export function union<T>(...arrays: T[][]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];
  
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        if (!seen.has(item)) {
          seen.add(item);
          result.push(item);
        }
      }
    }
  }
  return result;
}

/**
 * Creates an array of unique values, using an iteratee.
 */
export function unionBy<T>(...args: any[]): T[] {
  const iteratee = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const seen = new Map<any, boolean>();
  const result: T[] = [];
  
  for (const arr of args) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        const key = iteratee ? iteratee(item) : item;
        if (!seen.has(key)) {
          seen.set(key, true);
          result.push(item);
        }
      }
    }
  }
  return result;
}

/**
 * Creates a duplicate-free version of an array.
 * Fast path: uses Set for primitive arrays.
 */
export function uniq<T>(array: T[]): T[] {
  if (array.length <= 1) return array.slice();
  
  // Fast path for common case: all comparable values
  const seen = new Set<T>();
  const result: T[] = [];
  
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    if (!seen.has(val)) {
      seen.add(val);
      result.push(val);
    }
  }
  return result;
}

/**
 * Creates a duplicate-free version using an iteratee.
 */
export function uniqBy<T>(array: T[], iteratee: (val: T) => any): T[] {
  const seen = new Map<any, boolean>();
  const result: T[] = [];
  
  for (let i = 0; i < array.length; i++) {
    const key = iteratee(array[i]);
    if (!seen.has(key)) {
      seen.set(key, true);
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * This method is like `uniq` except it accepts a comparator.
 */
export function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
  const result: T[] = [];
  
  for (let i = 0; i < array.length; i++) {
    let isUnique = true;
    for (let j = 0; j < result.length; j++) {
      if (comparator(array[i], result[j])) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) result.push(array[i]);
  }
  return result;
}

/**
 * Creates an array of grouped elements (the first of each, the second of each, etc.)
 */
export function unzip<T>(array: T[][]): T[][] {
  if (!array.length) return [];
  
  const maxLen = array.reduce((max, arr) => Math.max(max, arr.length), 0);
  const result: T[][] = [];
  
  for (let i = 0; i < maxLen; i++) {
    result.push(array.map(arr => arr[i]));
  }
  return result;
}

/**
 * Creates an array excluding all given values.
 */
export function without<T>(array: T[], ...values: T[]): T[] {
  const exclude = new Set(values);
  const result: T[] = [];
  
  for (let i = 0; i < array.length; i++) {
    if (!exclude.has(array[i])) result.push(array[i]);
  }
  return result;
}

/**
 * Creates an array of unique values that is the symmetric difference.
 */
export function xor<T>(...arrays: T[][]): T[] {
  const count = new Map<T, number>();
  
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      const seen = new Set<T>();
      for (const item of arr) {
        if (!seen.has(item)) {
          seen.add(item);
          count.set(item, (count.get(item) || 0) + 1);
        }
      }
    }
  }
  
  const result: T[] = [];
  count.forEach((c, item) => {
    if (c === 1) result.push(item);
  });
  return result;
}

/**
 * Creates an array of grouped elements, the first of which contains first elements, etc.
 */
export function zip<T>(...arrays: T[][]): T[][] {
  return unzip(arrays);
}

/**
 * Converts an array of key-value pairs into an object.
 */
export function fromPairs<T extends string | number | symbol, V>(pairs: [T, V][]): Record<T, V> {
  const result = {} as Record<T, V>;
  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i];
    // Security: block __proto__ etc.
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    result[key] = value;
  }
  return result;
}

/**
 * Flattens array one level deep.
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const val = array[i];
    if (Array.isArray(val)) {
      for (let j = 0; j < val.length; j++) result.push(val[j]);
    } else {
      result.push(val as T);
    }
  }
  return result;
}

/**
 * Recursively flattens array.
 */
export function flattenDeep<T>(array: any[]): T[] {
  const result: T[] = [];
  
  function walk(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        walk(arr[i]);
      } else {
        result.push(arr[i]);
      }
    }
  }
  
  walk(array);
  return result;
}

/**
 * Flatten array up to depth times.
 */
export function flattenDepth<T>(array: any[], depth: number = 1): T[] {
  const result: T[] = [];
  
  function walk(arr: any[], d: number) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && d > 0) {
        walk(arr[i], d - 1);
      } else {
        result.push(arr[i]);
      }
    }
  }
  
  walk(array, depth);
  return result;
}

/**
 * Gets the first element of array. Alias for head.
 */
export const first = head;

/**
 * Flattens a nested array. Alias.
 */

// ---- Arrays with iteratee support (intersectionBy/intersectionWith) ----

/**
 * Creates an array of unique values included in all given arrays, using an iteratee.
 */
export function intersectionBy<T>(...args: any[]): T[] {
  const iteratee = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const arrays = args as T[][];
  
  if (arrays.length === 0) return [];
  const first = arrays[0];
  const restMaps = arrays.slice(1).map(arr => {
    const map = new Map<any, T>();
    for (const item of arr) map.set(iteratee ? iteratee(item) : item, item);
    return map;
  });
  
  const seen = new Set<any>();
  const result: T[] = [];
  
  for (const item of first) {
    const key = iteratee ? iteratee(item) : item;
    if (!seen.has(key) && restMaps.every(m => m.has(key))) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

/**
 * Creates an array of unique values included in all given arrays, using a comparator.
 */
export function intersectionWith<T>(...args: any[]): T[] {
  const comparator = typeof args[args.length - 1] === 'function' ? args.pop() as (a: T, b: T) => boolean : 
    ((a: T, b: T) => a === b) as (a: T, b: T) => boolean;
  const arrays = args as T[][];
  
  if (arrays.length === 0) return [];
  const firstArr = arrays[0];
  const rest = arrays.slice(1);
  
  const result: T[] = [];
  const seen = new Set<number>();
  
  for (let i = 0; i < firstArr.length; i++) {
    if (seen.has(i)) continue;
    const item = firstArr[i];
    let inAll = true;
    
    for (const arr of rest) {
      if (!arr.some(other => comparator(item, other))) {
        inAll = false;
        break;
      }
    }
    
    if (inAll) {
      result.push(item);
      // Mark duplicates in first array
      for (let j = i + 1; j < firstArr.length; j++) {
        if (comparator(item, firstArr[j])) seen.add(j);
      }
    }
  }
  return result;
}

/**
 * Creates an array of grouped elements with the first of each, using an iteratee.
 */
export function unzipWith<T, R>(array: T[][], iteratee: (...values: T[]) => R): R[] {
  if (!array.length) return [];
  
  const maxLen = array.reduce((max, arr) => Math.max(max, arr.length), 0);
  const result: R[] = [];
  
  for (let i = 0; i < maxLen; i++) {
    const group = array.map(arr => arr[i]);
    result.push(iteratee(...group));
  }
  return result;
}

/**
 * Creates an array of grouped elements calling iteratee on each group.
 */
export function zipWith<T, R>(...args: any[]): R[] {
  const iteratee = typeof args[args.length - 1] === 'function' ? args.pop() as (...values: T[]) => R : undefined as any;
  const arrays = args as T[][];
  return unzipWith(arrays, iteratee);
}

/**
 * Creates an object from arrays of keys and values (deep paths).
 */
export function zipObjectDeep(paths: (string | number)[], values: any[]): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const val = i < values.length ? values[i] : undefined;
    
    const parts = String(path).split(/[\.\[\]'"]+/).filter(Boolean);
    
    // Security: skip __proto__/constructor/prototype
    if (parts.some(p => p === '__proto__' || p === 'constructor' || p === 'prototype')) continue;
    
    let current = result;
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j];
      const isLast = j === parts.length - 1;
      
      if (isLast) {
        current[part] = val;
      } else {
        if (!current[part] || typeof current[part] !== 'object' || Array.isArray(current[part])) {
          const nextPart = parts[j + 1];
          current[part] = /^\d+$/.test(nextPart) ? [] : {};
        }
        current = current[part];
      }
    }
  }
  
  return result;
}

/**
 * Creates an object from arrays of keys and values.
 */
export function zipObject<T extends string | number | symbol, V>(props: T[], values: V[]): Record<T, V> {
  const result = {} as Record<T, V>;
  for (let i = 0; i < props.length; i++) {
    const key = props[i];
    if (key === '__proto__' as any || key === 'constructor' as any || key === 'prototype' as any) continue;
    result[key] = i < values.length ? values[i] : undefined as any;
  }
  return result;
}

/**
 * Creates an array of unique values that is the symmetric difference, using iteratee.
 */
export function xorBy<T>(...args: any[]): T[] {
  const iteratee = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  const arrays = args as T[][];
  const count = new Map<any, { item: T; cnt: number }>();
  
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      const seen = new Set<any>();
      for (const item of arr) {
        const key = iteratee ? iteratee(item) : item;
        if (!seen.has(key)) {
          seen.add(key);
          if (count.has(key)) {
            count.get(key)!.cnt++;
          } else {
            count.set(key, { item, cnt: 1 });
          }
        }
      }
    }
  }
  
  const result: T[] = [];
  count.forEach((entry) => {
    if (entry.cnt === 1) result.push(entry.item);
  });
  return result;
}

/**
 * Creates an array of unique values that is the symmetric difference, using comparator.
 */
export function xorWith<T>(...args: any[]): T[] {
  const comparator = typeof args[args.length - 1] === 'function' ? args.pop() as (a: T, b: T) => boolean : 
    ((a: T, b: T) => a === b) as (a: T, b: T) => boolean;
  const arrays = args as T[][];
  
  // Flatten all arrays and count via comparator
  const allItems: T[] = [];
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) allItems.push(item);
    }
  }
  
  const result: T[] = [];
  for (let i = 0; i < allItems.length; i++) {
    let count = 0;
    for (let j = 0; j < allItems.length; j++) {
      if (comparator(allItems[i], allItems[j])) count++;
    }
    if (count === 1) {
      // Check if we already added a comparable item
      let alreadyAdded = false;
      for (const r of result) {
        if (comparator(allItems[i], r)) { alreadyAdded = true; break; }
      }
      if (!alreadyAdded) result.push(allItems[i]);
    }
  }
  return result;
}

/**
 * Creates an array of unique values that is the symmetric difference, using comparator.
 */
export function unionWith<T>(...args: any[]): T[] {
  const comparator = typeof args[args.length - 1] === 'function' ? args.pop() as (a: T, b: T) => boolean : 
    ((a: T, b: T) => a === b) as (a: T, b: T) => boolean;
  const arrays = args as T[][];
  const result: T[] = [];
  
  for (const arr of arrays) {
    if (Array.isArray(arr)) {
      for (const item of arr) {
        let isDuplicate = false;
        for (const r of result) {
          if (comparator(item, r)) { isDuplicate = true; break; }
        }
        if (!isDuplicate) result.push(item);
      }
    }
  }
  return result;
}

/**
 * Alias for `pullAllBy` — like pullAll but accepts iteratee.
 */
export function pullAllBy<T>(array: T[], values: T[], iteratee: (val: T) => any): T[] {
  const mappedValues = new Map<any, boolean>();
  for (const v of values) mappedValues.set(iteratee(v), true);
  
  const removed: T[] = [];
  let writeIdx = 0;
  
  for (let i = 0; i < array.length; i++) {
    if (mappedValues.has(iteratee(array[i]))) {
      removed.push(array[i]);
    } else {
      array[writeIdx++] = array[i];
    }
  }
  array.length = writeIdx;
  return removed;
}

/**
 * Alias for `pullAllWith` — like pullAll but accepts comparator.
 */
export function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[] {
  const removed: T[] = [];
  let writeIdx = 0;
  
  for (let i = 0; i < array.length; i++) {
    const shouldRemove = values.some(v => comparator(array[i], v));
    if (shouldRemove) {
      removed.push(array[i]);
    } else {
      array[writeIdx++] = array[i];
    }
  }
  array.length = writeIdx;
  return removed;
}

/**
 * Finds index of first element passing predicate.
 */
export function findIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => any, fromIndex: number = 0): number {
  for (let i = fromIndex; i < array.length; i++) {
    if (predicate(array[i], i, array)) return i;
  }
  return -1;
}

/**
 * Finds index of last element passing predicate.
 */
export function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => any, fromIndex?: number): number {
  let i = fromIndex === undefined ? array.length - 1 : fromIndex;
  for (; i >= 0; i--) {
    if (predicate(array[i], i, array)) return i;
  }
  return -1;
}

/**
 * Uses a binary search to determine the highest index where value should be inserted.
 */
export function sortedLastIndex<T>(array: T[], value: T): number {
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (array[mid] <= value) low = mid + 1;
    else high = mid;
  }
  return low;
}

/**
 * Like sortedLastIndex but accepts iteratee.
 */
export function sortedLastIndexBy<T>(array: T[], value: T, iteratee: (val: T) => any): number {
  const valMapped = iteratee(value);
  let low = 0;
  let high = array.length;
  
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (iteratee(array[mid]) <= valMapped) low = mid + 1;
    else high = mid;
  }
  return low;
}

/**
 * Returns the index of the first occurrence of value in sorted array using binary search.
 */
export function sortedIndexOf<T>(array: T[], value: T): number {
  const idx = sortedIndex(array, value);
  return idx < array.length && array[idx] === value ? idx : -1;
}

/**
 * Returns the index of the last occurrence of value in sorted array using binary search.
 */
export function sortedLastIndexOf<T>(array: T[], value: T): number {
  const idx = sortedLastIndex(array, value);
  return idx > 0 && array[idx - 1] === value ? idx - 1 : -1;
}

/**
 * Like sortedUniq but accepts iteratee.
 */
export function sortedUniqBy<T>(array: T[], iteratee: (val: T) => any): T[] {
  if (array.length <= 1) return array.slice();
  
  const result: T[] = [array[0]];
  for (let i = 1; i < array.length; i++) {
    if (iteratee(array[i]) !== iteratee(array[i - 1])) result.push(array[i]);
  }
  return result;
}
