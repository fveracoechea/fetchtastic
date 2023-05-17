import { HttpMethod, HttpMethods } from '../core';

/**
 * Identity, function that returns the same argument passed to it
 */
export const identity: <T = unknown>(data: T) => T = x => x;

/**
 * No operation
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (..._any: unknown[]) => void null;

/**
 * Returns `true` if the given value is a valid `HttpMethod`
 */
export function isHttpMethod(value: unknown): value is HttpMethod {
  return (
    typeof value === 'string' && HttpMethods.some(m => m === value.toUpperCase())
  );
}
