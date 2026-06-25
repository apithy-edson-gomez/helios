/**
 * Helios types shared across all modules
 */

export type Predicate<T = any> = (value: T, index: number, collection: T[]) => boolean;
export type Iteratee<T = any, R = any> = (value: T, index: number | string, collection: any) => R;
export type Comparator<T = any> = (a: T, b: T) => boolean;
export type PropertyPath = string | number | (string | number)[];

export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}
