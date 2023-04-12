import { XShieldError } from '../error';
import { XShieldID } from './internals';

export type DataAssertionFn<T = unknown> = (data: unknown) => T;

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

// * Core Interfaces

export type XShieldOptions = Omit<RequestInit, 'headers' | 'method'>;

export interface XShield<T = unknown> {
  _type: symbol;
  url: string | URL;
  headers: Headers;
  options: XShieldOptions;
  catchers: XShieldCatchers;
  parser: ResponseParser;
  method: HttpMethod;
  searchParams: URLSearchParams;
  validateResponse: DataAssertionFn<T>;
}

// * Error Catching

export interface XShieldCatcher<T = unknown> {
  (error: XShieldError): T;
}

export type XShieldCatchers = Map<number, XShieldCatcher>;

// * Constructor

export function initialize(): XShield<unknown> {
  return {
    _type: XShieldID,
    url: '',
    headers: new Headers(),
    method: 'GET',
    options: {},
    catchers: new Map<number, XShieldCatcher>(),
    parser: 'JSON',
    searchParams: new URLSearchParams(),
    validateResponse: x => x,
  };
}