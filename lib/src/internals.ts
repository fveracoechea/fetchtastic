import { XShield } from './core';

export const XShieldID = Symbol('XShield');
export const XShieldErrorID = Symbol('XShieldError');

export function isXShield(x: unknown): x is XShield {
  return (
    x != null &&
    typeof x === 'object' &&
    '_type' in x &&
    x._type === XShieldID &&
    'url' in x &&
    'method' in x &&
    'options' in x
  );
}

export function assertsXShield(x: unknown): asserts x is XShield {
  if (!isXShield(x)) {
    throw new Error('XShield: Invalid configuration object.');
  }
}
