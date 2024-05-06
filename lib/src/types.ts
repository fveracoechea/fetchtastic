/**
 * HTTP methods supported by the HTTP protocol.
 * This array contains strings representing various HTTP methods.
 * The methods include OPTIONS, GET, HEAD, PUT, POST, DELETE, and PATCH.
 */
export const HttpMethods = ['OPTIONS', 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'] as const;

/**
 * Possible response data types that can be parsed by the client.
 * This array contains strings representing various response data types.
 * The types include ArrayBuffer, Blob, FormData, JSON, and Text.
 */
export const ResponseParsers = ['ArrayBuffer', 'Blob', 'FormData', 'JSON', 'Text'] as const;

/**
 * Represents an HTTP method.
 * This type is a union of strings representing various HTTP methods.
 */
export type HttpMethod = (typeof HttpMethods)[number];

/**
 * Represents a response parser for handling response data.
 * This type is a union of strings representing various response data types.
 */
export type ResponseParser = (typeof ResponseParsers)[number];

/**
 * Represents various types that can be used as search parameters in a URL.
 * This type is a union of string, URLSearchParams, array of key-value pairs,
 * and record of key-value pairs.
 */
export type SearchParamInput =
  | string
  | URLSearchParams
  | [string, string | boolean | number][]
  | Record<string, string | boolean | number>;

/**
 * Options for configuring the behavior of Fetchtastic.
 * This type extends RequestInit but omits 'signal' and 'method' properties.
 */
export type FetchtasticOptions = Omit<RequestInit, 'signal' | 'method' | 'body' | 'headers'>;

/**
 * Represents options for making a fetch request.
 * This type extends RequestInit and includes the 'method' property as HttpMethod.
 */
export interface FetchOptions extends RequestInit {
  method: HttpMethod;
}

/**
 * Represents common request headers used in HTTP requests.
 * This type is a string union of common request header names.
 * For example:
 * 'Accept', 'Content-Type', 'Authorization', etc.
 */
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

/**
 * Represents a function used to assert the type of data.
 * This function takes an unknown data and returns a specified type.
 */
export type DataAssertionFn<T = unknown> = (data: unknown) => T;
