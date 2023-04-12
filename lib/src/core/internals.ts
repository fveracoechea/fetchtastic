import { XShield } from './xshield';

export const XShieldID = Symbol('XShield');
export const XShieldErrorID = Symbol('XShieldError');

/**
 * No operation
 */
export const noop: (data: unknown) => unknown = x => x;

export function isXShield(x: unknown): x is XShield {
  return (
    x != null &&
    typeof x === 'object' &&
    '_type' in x &&
    x._type === XShieldID &&
    'url' in x &&
    'options' in x
  );
}

export function assertsXShield(x: unknown): asserts x is XShield {
  if (!isXShield(x)) {
    throw new Error('XShield: Invalid configuration object.');
  }
}
