import { HttpMethod, SearchParamInput } from './types.ts';

/**
 * Represents options for making a fetch request.
 * This type extends RequestInit and includes the 'method' property as HttpMethod.
 */
export type FetchOptions = Omit<RequestInit, 'method'> & {
  method: HttpMethod;
};

export function getNewSearchParms(data: SearchParamInput) {
  let result: string | string[][] | URLSearchParams;

  if (typeof data === 'string' || data instanceof URLSearchParams) {
    result = data;
  } else if (Array.isArray(data)) {
    result = [];
    for (const [key, value] of data) {
      result.push([key, String(value)]);
    }
  } else {
    result = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result.push([key, String(data[key])]);
      }
    }
  }

  return new URLSearchParams(result);
}

export function shouldStringify(body: unknown, headers: Headers): boolean {
  const isContentTypeJson =
    headers.get('Content-Type') === 'application/json' ||
    headers.get('content-type') === 'application/json';

  return (
    isContentTypeJson &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof ReadableStream) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams)
  );
}
