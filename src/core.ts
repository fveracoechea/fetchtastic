import { XShieldError } from './error';
import { ZodSchema, ZodAny, any as zodAny } from 'zod';

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

export interface XShieldRequest<Schema extends ZodSchema = ZodAny> {
  _type: 'XShieldRequest';
  url: string | URL;
  headers: Headers;
  options: XShieldOptions;
  catchers: XShieldCatchers;
  parser: ResponseParser;
  schema: Schema;
  method: HttpMethod;
  searchParams: URLSearchParams;
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

export function initialize(instance?: XShieldRequest): XShieldRequest {
  return (
    instance || {
      _type: 'XShieldRequest',
      url: '',
      headers: new Headers(),
      method: 'GET',
      options: {},
      catchers: new Map<number, XShieldCatcher>(),
      parser: 'JSON',
      schema: zodAny(),
      searchParams: new URLSearchParams(),
    }
  );
}
