// * HttpMethods

export const HttpMethods = [
  'OPTIONS',
  'GET',
  'HEAD',
  'PUT',
  'POST',
  'DELETE',
  'PATCH',
] as const;

export type HttpMethod = (typeof HttpMethods)[number];

// * ResponseParsers

export const ResponseParsers = [
  'ArrayBuffer',
  'Blob',
  'FormData',
  'JSON',
  'Text',
] as const;

export type ResponseParser = (typeof ResponseParsers)[number];

export type SearchParamInput =
  | string
  | URLSearchParams
  | [string, string | boolean | number][]
  | Record<string, string | boolean | number>;

export type DataGrabOptions = Omit<RequestInit, 'signal' | 'method'>;

export interface FetchOptions extends RequestInit {
  method: HttpMethod;
}

export type FetchRequestHeader =
  | 'Accept'
  | 'Content-Type'
  | 'Authorization'
  | 'User-Agent'
  | 'Referer'
  | 'Cache-Control'
  | 'Accept-Encoding'
  | 'Origin'
  | 'Connection'
  | 'Cookie'
  | 'Pragma'
  | 'If-Modified-Since';

export type DataAssertionFn<T = unknown> = (data: unknown) => T;
