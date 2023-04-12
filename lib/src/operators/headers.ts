import { XShield } from '../core/xshield';
import { assertsXShield } from '../core/internals';

export function headers(
  data: [string, string][] | Record<string, string>,
  replace = false,
) {
  return <T>(config: XShield<T>): XShield<T> => {
    assertsXShield(config);
    const newHeaders = new Headers(data);

    if (replace) {
      return {
        ...config,
        headers: newHeaders,
      };
    }

    config.headers.forEach((value, key) => {
      if (!newHeaders.has(key)) {
        newHeaders.set(key, value);
      }
    });

    return { ...config, headers: newHeaders };
  };
}
