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
