import { initialize, XShieldRequest } from '../core';

export function headers(
  data: [string, string][] | Record<string, string>,
  replace = false,
) {
  return (request?: XShieldRequest) => {
    const instance = initialize(request);

    const newHeaders = new Headers(data);

    if (replace) {
      return {
        ...instance,
        headers: newHeaders,
      };
    }

    instance.headers.forEach((value, key) => {
      if (!newHeaders.has(key)) {
        newHeaders.set(key, value);
      }
    });

    return { ...instance, headers: newHeaders };
  };
}
