import { ResponseParser, SearchParamInput } from './types.ts';

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

export function getResponseParser(parser: ResponseParser) {
  return (response: Response) => {
    const cases = {
      JSON: () => response.json(),
      Text: () => response.text(),
      ArrayBuffer: () => response.arrayBuffer(),
      Blob: () => response.blob(),
      FormData: () => response.formData(),
    };
    return cases[parser]();
  };
}

export function isJsonBody(body: unknown) {
  return (
    typeof body === 'object' &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof ReadableStream) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams)
  );
}

export function shouldStringify(body: unknown, headers: Headers): boolean {
  const isContentTypeJson =
    headers.get('Content-Type') === 'application/json' ||
    headers.get('content-type') === 'application/json';

  return isContentTypeJson ? true : isJsonBody(body);
}
