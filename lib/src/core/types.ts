import { HttpMethods, ResponseParsers } from '../internals/constants';

export type HttpMethod = (typeof HttpMethods)[number];

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
