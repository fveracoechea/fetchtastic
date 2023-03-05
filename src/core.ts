import { XShieldError } from './error';

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

export type HttpMethod = typeof HttpMethods[number];

// * ResponseParsers

export const ResponseParsers = [
  'ArrayBuffer',
  'Blob',
  'FormData',
  'JSON',
  'Text',
] as const;

export type ResponseParser = typeof ResponseParsers[number];

// * Core Interfaces

export interface XShieldOptions
  extends Omit<RequestInit, 'headers' | 'method'> {}

export interface XShieldRequest<Result = unknown> {
  _type: 'XShieldRequest';
  url: string | URL;
  headers: Headers;
  options: XShieldOptions;
  catchers: XShieldCatchers;
  parser: ResponseParser;
  method: HttpMethod;
  searchParams: URLSearchParams;
  validateResponse(data: unknown): Result;
}

// * Composition

export interface XShieldComposable {
  (instance?: XShieldRequest): XShieldRequest;
}

// * Error Catching

export interface XShieldCatcher<T = unknown> {
  (error: XShieldError): T;
}

export interface XShieldCatchers extends Map<number, XShieldCatcher> {}

// * Constructor

export function initialize<Result = unknown>(
  instance?: XShieldRequest<Result>,
): XShieldRequest<Result> {
  return (
    instance || {
      _type: 'XShieldRequest',
      url: '',
      headers: new Headers(),
      method: 'GET',
      options: {},
      catchers: new Map<number, XShieldCatcher>(),
      parser: 'JSON',
      validateResponse: data => data as Result,
      searchParams: new URLSearchParams(),
    }
  );
}
