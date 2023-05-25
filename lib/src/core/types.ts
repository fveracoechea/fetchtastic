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

export type FetchtasticOptions = Omit<RequestInit, 'signal' | 'method'>;

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

export interface ConfigurableFetch<T> {
  headers(data?: HeadersInit, replace?: boolean): T;
  appendHeader(name: FetchRequestHeader, value: string): T;
  appendHeader(name: string, value: string): T;
  deleteHeader(name: string): T;

  url(url: URL): T;
  url(url: string, replace?: boolean): T;
  url(url: string, replace?: boolean): T;

  searchParams(data?: SearchParamInput, replace?: boolean): T;
  appendSearchParam(name: string, value: string | number | boolean): T;
  deleteSearchParam(name: string): T;

  body(body: BodyInit | null | unknown): T;

  setOptions(options: FetchtasticOptions, replace?: boolean): T;
}
