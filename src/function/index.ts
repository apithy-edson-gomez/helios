/**
 * Helios Function Module
 *
 * Collection of function utility methods modeled after Lodash function methods.
 * All functions are self-contained, typed, efficient, and security-hardened.
 * No external imports.
 */

/** A generic function type. */
type AnyFunction = (...args: unknown[]) => unknown;

/** Options for debounce and throttle. */
interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Safely gets the current timestamp (ms).
 */
function now(): number {
  return Date.now();
}

/**
 * Creates a partial application by prepending arguments to a function.
 */
function createPartial(func: AnyFunction, partials: unknown[], fromRight: boolean): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    const combined = fromRight
      ? [...args, ...partials]
      : [...partials, ...args];
    return func.apply(this, combined);
  };
}

// ─── Exported Functions ──────────────────────────────────────────────────────

/**
 * Creates a function that invokes func once it's called n or more times.
 */
export function after(
  n: number,
  func: AnyFunction
): AnyFunction {
  let count = n;
  return function (this: unknown, ...args: unknown[]) {
    count -= 1;
    if (count <= 0) {
      return func.apply(this, args);
    }
    return undefined;
  };
}

/**
 * Creates a function that invokes func while it's called less than n times.
 * Subsequent calls return the result of the last invocation.
 */
export function before(
  n: number,
  func: AnyFunction
): AnyFunction {
  let count = n;
  let lastResult: unknown;
  return function (this: unknown, ...args: unknown[]) {
    if (--count > 0) {
      lastResult = func.apply(this, args);
    }
    if (count <= 0) {
      func = undefined as unknown as AnyFunction;
    }
    return lastResult;
  };
}

/**
 * Creates a function that binds func to thisArg, with optional partial arguments.
 */
export function bind(
  func: AnyFunction,
  thisArg: unknown,
  ...partials: unknown[]
): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    return func.apply(thisArg, [...partials, ...args]);
  };
}

/**
 * Curries a function, returning a new function that can be called with partial
 * arguments until all arguments are supplied.
 */
export function curry(
  func: AnyFunction,
  arity: number = func.length
): AnyFunction {
  return function curried(this: unknown, ...args: unknown[]) {
    if (args.length >= arity) {
      return func.apply(this, args.slice(0, arity));
    }
    return function (this: unknown, ...args2: unknown[]) {
      return curried.apply(this, [...args, ...args2]);
    };
  };
}

/**
 * Creates a debounced function that delays invoking func until after wait ms
 * have elapsed since the last invocation.
 */
export function debounce(
  func: AnyFunction,
  wait: number = 0,
  options?: DebounceOptions
): AnyFunction & { cancel: () => void; flush: () => void } {
  const leading = options?.leading ?? false;
  const trailing = options?.trailing ?? true;
  const maxWait = options?.maxWait;

  let lastArgs: unknown[] | null = null;
  let lastThis: unknown = null;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;

  function invokeFunc(time: number): unknown {
    const args = lastArgs!;
    const thisArg = lastThis;
    lastArgs = null;
    lastThis = null;
    lastInvokeTime = time;
    return func.apply(thisArg, args);
  }

  function startTimer(pendingFunc: () => void, waitTime: number): ReturnType<typeof setTimeout> {
    return setTimeout(pendingFunc, waitTime);
  }

  function leadingEdge(time: number): unknown {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    if (leading) return invokeFunc(time);
    return undefined;
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    if (maxWait !== undefined) {
      return Math.min(timeWaiting, maxWait - timeSinceLastInvoke);
    }
    return timeWaiting;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    if (lastCallTime === null) return true;
    if (timeSinceLastCall >= wait) return true;
    if (timeSinceLastCall < 0) return true;
    if (maxWait !== undefined && time - lastInvokeTime >= maxWait) return true;
    return false;
  }

  function timerExpired(): void {
    const time = now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
      return;
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number): unknown {
    timerId = null;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = null;
    lastThis = null;
    return undefined;
  }

  function debounced(this: unknown, ...args: unknown[]): unknown {
    const time = now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === null) {
        return leadingEdge(time);
      }
      if (maxWait !== undefined) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(time);
      }
    }
    if (timerId === null) {
      timerId = startTimer(timerExpired, wait);
    }
    return undefined;
  }

  debounced.cancel = function (): void {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    lastArgs = null;
    lastThis = null;
    timerId = null;
    lastCallTime = null;
    lastInvokeTime = 0;
  };

  debounced.flush = function (): unknown {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (lastArgs) {
      return invokeFunc(now());
    }
    return undefined;
  };

  return debounced;
}

/**
 * Defers invoking func until the current call stack has cleared.
 */
export function defer(func: AnyFunction, ...args: unknown[]): number {
  return setTimeout(() => func.apply(null, args), 1) as unknown as number;
}

/**
 * Invokes func after wait milliseconds.
 */
export function delay(func: AnyFunction, wait: number, ...args: unknown[]): number {
  return setTimeout(() => func.apply(null, args), wait) as unknown as number;
}

/**
 * Creates a function that invokes func with arguments reversed.
 */
export function flip(func: AnyFunction): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    return func.apply(this, args.reverse());
  };
}

/**
 * Creates a memoized version of func. Uses a Map for the cache.
 * The resolver determines the cache key; defaults to the first argument.
 */
export function memoize<T extends AnyFunction>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>> } {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: unknown, ...args: Parameters<T>) {
    const key = resolver ? resolver(...args) : String(args[0]);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = func.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T & { cache: Map<string, ReturnType<T>> };

  memoized.cache = cache;
  return memoized;
}

/**
 * Creates a function that negates the result of the predicate.
 */
export function negate(predicate: AnyFunction): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    return !predicate.apply(this, args);
  };
}

/**
 * Creates a function that is restricted to being called once.
 * Subsequent calls return the result of the first invocation.
 */
export function once(func: AnyFunction): AnyFunction {
  let called = false;
  let result: unknown;
  return function (this: unknown, ...args: unknown[]) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

/**
 * Creates a function that invokes func with its arguments transformed by
 * the corresponding transforms.
 */
export function overArgs(
  func: AnyFunction,
  transforms: AnyFunction[]
): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    const transformed = args.map((arg, index) => {
      const transform = transforms[index];
      return transform ? transform(arg) : arg;
    });
    return func.apply(this, transformed);
  };
}

/**
 * Creates a function that partially applies arguments to func.
 * (Left-to-right partial application.)
 */
export function partial(
  func: AnyFunction,
  ...partials: unknown[]
): AnyFunction {
  return createPartial(func, partials, false);
}

/**
 * Creates a function that partially applies arguments from the right.
 */
export function partialRight(
  func: AnyFunction,
  ...partials: unknown[]
): AnyFunction {
  return createPartial(func, partials, true);
}

/**
 * Creates a function that passes the last arguments as an array.
 */
export function rest(
  func: AnyFunction,
  start: number = func.length - 1
): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    const normalArgs = args.slice(0, start);
    const restArgs = args.slice(start);
    const combined = [...normalArgs, restArgs];
    return func.apply(this, combined);
  };
}

/**
 * Creates a function that spreads an array argument into individual arguments.
 */
export function spread(
  func: AnyFunction,
  start: number = 0
): AnyFunction {
  return function (this: unknown, args: unknown[]): unknown {
    const spreadArgs = args.slice(start);
    return func.apply(this, spreadArgs);
  } as AnyFunction;
}

/**
 * Creates a throttled function that only invokes func at most once per every
 * wait milliseconds. Supports leading and trailing invocation.
 */
export function throttle(
  func: AnyFunction,
  wait: number = 0,
  options?: DebounceOptions
): AnyFunction & { cancel: () => void; flush: () => void } {
  const trailing = options?.trailing ?? true;

  let timerId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: unknown[] | null = null;
  let lastThis: unknown = null;
  let lastInvokeTime = 0;

  function invokeFunc(): unknown {
    const args = lastArgs!;
    const thisArg = lastThis;
    lastArgs = null;
    lastThis = null;
    lastInvokeTime = now();
    return func.apply(thisArg, args);
  }

  function trailingEdge(): unknown {
    timerId = null;
    if (trailing && lastArgs) {
      return invokeFunc();
    }
    lastArgs = null;
    lastThis = null;
    return undefined;
  }

  function startTimer(pendingFunc: () => void, waitTime: number): ReturnType<typeof setTimeout> {
    return setTimeout(pendingFunc, waitTime);
  }

  function throttled(this: unknown, ...args: unknown[]): unknown {
    const time = now();
    const timeSinceLastInvoke = time - lastInvokeTime;

    lastArgs = args;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;

    if (timeSinceLastInvoke >= wait) {
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
      return invokeFunc();
    }

    if (timerId === null && trailing) {
      startTimer(trailingEdge, wait - timeSinceLastInvoke);
    }
    return undefined;
  }

  throttled.cancel = function (): void {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    lastArgs = null;
    lastThis = null;
    lastInvokeTime = 0;
  };

  throttled.flush = function (): unknown {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (lastArgs) {
      return invokeFunc();
    }
    return undefined;
  };

  return throttled;
}

/**
 * Creates a function that accepts up to one argument, ignoring any additional.
 */
export function unary(func: AnyFunction): AnyFunction {
  return function (this: unknown, arg: unknown) {
    return func.call(this, arg);
  };
}

/**
 * Creates a function that passes value to the wrapper as its first argument.
 * Additional arguments are passed after.
 */
export function wrap(
  value: unknown,
  wrapper: AnyFunction
): AnyFunction {
  return function (this: unknown, ...args: unknown[]) {
    return wrapper.apply(this, [value, ...args]);
  };
}
