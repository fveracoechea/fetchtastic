import { XShield } from '../core';
import { assertsXShield } from '../internals';

export function url(url: URL): <T>(config: XShield<T>) => XShield<T>;

export function url(
  url: string,
  replace?: boolean,
): <T>(config: XShield<T>) => XShield<T>;

export function url(url: string | URL, replace = false) {
  return <T>(config: XShield<T>): XShield<T> => {
    assertsXShield(config);
    if (replace || url instanceof URL) {
      return {
        ...config,
        url,
      };
    } else {
      const oldURL = config.url.toString();
      const split = oldURL.split('?');
      return {
        ...config,
        url: split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url,
      };
    }
  };
}
