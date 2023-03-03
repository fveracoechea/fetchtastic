import { XShieldRequest, XShieldComposable } from '../core';

export function compose(...fns: XShieldComposable[]): XShieldComposable {
  let instance: XShieldRequest | undefined;

  for (let index = 0; index < fns.length; index++) {
    const fn = fns[index];
    instance = fn(instance);
  }

  return () => instance!;
}
