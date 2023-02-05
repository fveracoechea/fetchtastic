import { initialize, XShieldRequest } from '../core';

export function headers(
  data: [string, string][] | Record<string, string>,
  replace = false,
) {
  return (request?: XShieldRequest) => {
    const instance = initialize(request);

    if (replace) {
      return {
        ...instance,
        headers: new Headers(data),
      };
    }

    const newHeaders = new Headers(data);
    instance.headers.forEach((value, key) => {
      if (!newHeaders.has(key)) {
        newHeaders.set(key, value);
      }
    });

    return { ...instance, headers: newHeaders };
  };
}
