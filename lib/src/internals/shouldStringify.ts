/**
 * Returns `true` if the given body should be JSON.stringify
 */
export function shouldStringify(body: unknown, headers: Headers): boolean {
  const isContentTypeJson =
    headers.get('Content-Type') === 'application/json' ||
    headers.get('content-type') === 'application/json';

  return isContentTypeJson
    ? true
    : typeof body === 'object' &&
        !(body instanceof Blob) &&
        !(body instanceof ArrayBuffer) &&
        !(body instanceof ReadableStream) &&
        !(body instanceof FormData) &&
        !(body instanceof URLSearchParams);
}
