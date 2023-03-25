import { XShield } from '../core';

export function headers(
  data: [string, string][] | Record<string, string>,
  replace = false,
) {
  return <T>(config: XShield<T>): XShield<T> => {
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
