import { initialize, XShieldRequest, XShieldComposable } from '../core';

export function url(url: URL): XShieldComposable;
export function url(url: string, replace?: boolean): XShieldComposable;
export function url(url: string | URL, replace = false): XShieldComposable {
  return (request?: XShieldRequest) => {
    const instance = initialize(request);

    if (replace || url instanceof URL) {
      return {
        ...instance,
        url,
      };
    } else {
      const oldURL = instance.url.toString();
      const split = oldURL.split('?');
      return {
        ...instance,
        url: split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url,
      };
    }
  };
}
