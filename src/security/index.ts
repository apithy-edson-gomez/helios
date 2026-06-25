/**
 * Security utilities — prototype pollution prevention, path validation, etc.
 */
import { PropertyPath } from '../types';

const PROTO_KEY_REGEX = /^__proto__$|^prototype$|^constructor$/;

/**
 * Validates that a property path doesn't target Object.prototype
 * Throws on dangerous paths to prevent prototype pollution.
 */
export function sanitizePath(path: PropertyPath): (string | number)[] {
  const parts = Array.isArray(path) ? path : String(path).split(/[\.\[\]'"]+/).filter(Boolean);
  
  for (const part of parts) {
    if (typeof part === 'string' && PROTO_KEY_REGEX.test(part)) {
      throw new Error(`SecurityError: Access to '${part}' is blocked (prototype pollution prevention)`);
    }
  }
  return parts;
}

/**
 * Deep-freeze an object to make it immutable.
 * Recursively freezes all properties. Optionally handles arrays and nested objects.
 */
export function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as any)[name];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

/**
 * Returns a copy of a value — safe from reference leaks.
 * Simple version for primitives, structuredClone for objects.
 */
export function safeClone<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof value !== 'object') return value;
  
  try {
    return structuredClone(value);
  } catch {
    // Fallback for older environments
    return JSON.parse(JSON.stringify(value));
  }
}

/**
 * Creates a function that checks if a value is the given type.
 */
export function isOfType(type: string) {
  return (value: any): boolean => Object.prototype.toString.call(value) === `[object ${type}]`;
}

/**
 * Guards against accessing properties on arrays with indexOf semantics
 * that could be abused to access unexpected indices.
 */
export function clampIndex(index: number, length: number): number {
  return Math.max(-length, Math.min(index, length - 1));
}

/**
 * Safely resolves a property value without prototype traversal.
 * Unlike lodash _.get, this blocks access to __proto__, prototype, constructor.
 */
export function safeGet(obj: any, path: PropertyPath, defaultValue?: any): any {
  const parts = sanitizePath(path);
  let current = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = (current as any)[part];
  }
  
  return current !== undefined ? current : defaultValue;
}

/**
 * Checks if a value is a plain object (not array, not null, not class instance)
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}
