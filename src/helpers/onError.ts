import {
  initialize,
  XShieldRequest,
  XShieldCatcher,
  XShieldComposable,
} from '../core';

export function onError(
  errorCode: number,
  callback: XShieldCatcher,
): XShieldComposable {
  return (request?: XShieldRequest) => {
    const instance = initialize(request);

    const newCatchers = new Map<number, XShieldCatcher>(
      instance.catchers.entries(),
    );

    newCatchers.set(errorCode, callback);

    return {
      ...instance,
      catchers: newCatchers,
    };
  };
}
