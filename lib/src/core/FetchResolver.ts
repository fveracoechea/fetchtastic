import { Fetchtastic } from './Fetchtastic';
import { ErrorCatcher, HttpError } from './HttpError';
import { getResponseParser } from '../internals/getResponseParser';
import { identity } from '../utils/helpers';
import {
  HttpMethod,
  DataAssertionFn,
  ConfigurableFetch,
  FetchRequestHeader,
  SearchParamInput,
  FetchtasticOptions,
} from './types';

/**
 * Represents a resolver that performs fetch requests with a specific HTTP method.
 * @preserve
 */
export class FetchResolver<Method extends HttpMethod>
  implements ConfigurableFetch<FetchResolver<HttpMethod>>
{
  #config: Fetchtastic;
  #method: Method;
  #catchers: Map<number | string, Set<ErrorCatcher>>;

  /**
   * Gets the HTTP method associated with this resolver.
   * @preserve
   */
  get method() {
    return this.#method;
  }

  /**
   * Creates a new instance of FetchResolver.
   * @param config The Fetchtastic instance to use for configuring the request.
   * @param method The HTTP method associated with this resolver.
   * @preserve
   */
  constructor(config: Fetchtastic, method: Method) {
    this.#method = method;
    this.#config = config;
    this.json = this.json.bind(this);
    this.arrayBuffer = this.arrayBuffer.bind(this);
    this.blob = this.blob.bind(this);
    this.formData = this.formData.bind(this);
    this.text = this.text.bind(this);
    this.resolve = this.resolve.bind(this);
    this.#catchers = new Map();
  }

  /**
   * Sets the URL for the fetch request.
   * @param url The URL to set.
   * @param replace Optional. Specifies whether to replace the current URL or append to it.
   * @preserve
   */
  url(url: URL): this;
  url(url: string, replace?: boolean): this;
  url(url: string | URL, replace = false) {
    if (typeof url === 'string') {
      this.#config = this.#config.url(url, replace);
    } else {
      this.#config = this.#config.url(url);
    }
    return this;
  }

  /**
   * Sets the headers for the fetch request.
   * @param data The headers data to set.
   * @param replace Optional. Specifies whether to replace the current headers or append to them.
   * @preserve
   */
  headers(data?: HeadersInit, replace?: boolean) {
    this.#config = this.#config.headers(data, replace);
    return this;
  }

  /**
   * Appends a header to the fetch request.
   * @param name The name of the header.
   * @param value The value of the header.
   * @preserve
   */
  appendHeader(name: FetchRequestHeader, value: string): this;
  appendHeader(name: string, value: string) {
    this.#config = this.#config.appendHeader(name, value);
    return this;
  }

  /**
   * Deletes a header from the fetch request.
   * @param name The name of the header to delete.
   * @preserve
   */
  deleteHeader(name: string) {
    this.#config = this.#config.deleteHeader(name);
    return this;
  }

  /**
   * Sets the search parameters for the fetch request.
   * @param data The search parameters data to set.
   * @param replace Optional. Specifies whether to replace the current search parameters or append to them.
   * @preserve
   */
  searchParams(data?: SearchParamInput, replace?: boolean) {
    this.#config = this.#config.searchParams(data, replace);
    return this;
  }

  /**
   * Appends a search parameter to the fetch request.
   * @param name The name of the search parameter.
   * @param value The value of the search parameter.
   * @preserve
   */
  appendSearchParam(name: string, value: string | number | boolean): this {
    this.#config = this.#config.appendSearchParam(name, value);
    return this;
  }
  /**
   * Deletes a search parameter from the fetch request.
   * @param name The name of the search parameter to delete.
   * @returns The updated FetchResolver instance.
   * @preserve
   */
  deleteSearchParam(name: string): this {
    this.#config = this.#config.deleteSearchParam(name);
    return this;
  }

  /**
   * Sets the request body for the fetch request.
   * @param body The request body to set.
   * @preserve
   */
  body(body: unknown) {
    this.#config = this.#config.body(body);
    return this;
  }

  /**
   * Sets the options for the fetch request.
   * @param options The options to set.
   * @param replace Optional. Specifies whether to replace the current options or merge them.
   * @preserve
   */
  setOptions(options: FetchtasticOptions, replace?: boolean) {
    this.#config = this.#config.setOptions(options, replace);
    return this;
  }

  /**
   * Resolves the fetch request and returns the response.
   * @returns A Promise that resolves to the fetch response.
   * @throws FetchError if the fetch request fails.
   * @preserve
   */
  async resolve() {
    const options = this.#config.getOptions(this.method);
    const response = await fetch(this.#config.URL, options);
    if (!response.ok) {
      const catchers = this.#catchers.get(response.status);
      if (!catchers) {
        throw new HttpError(this.#config.URL, this.method, response.clone());
      }
      catchers.forEach(fn =>
        fn(new HttpError(this.#config.URL, this.method, response.clone())),
      );
    }
    return response;
  }

  /**
   * Send the fetch request and returns the response as JSON.
   * @param assertData Optional. A function to assert and transform the response data.
   * @returns A Promise that resolves to the JSON response.
   * @preserve
   */
  json<T = unknown>(assertData?: DataAssertionFn<T>): Promise<T> {
    const assertFn = (assertData ?? identity) as DataAssertionFn<T>;
    return this.resolve().then(getResponseParser('JSON')).then(assertFn);
  }

  /**
   * Send the fetch request and returns the response as an ArrayBuffer.
   * @returns A Promise that resolves to the ArrayBuffer response.
   * @preserve
   */
  arrayBuffer(): Promise<ArrayBuffer> {
    return this.resolve().then(getResponseParser('ArrayBuffer'));
  }

  /**
   * Resolves the fetch request and returns the response as a Blob.
   * @returns A Promise that resolves to the Blob response.
   * @preserve
   */
  blob(): Promise<Blob> {
    return this.resolve().then(getResponseParser('Blob'));
  }

  /**
   * Resolves the fetch request and returns the response as a FormData.
   * @returns A Promise that resolves to the FormData response.
   * @preserve
   */
  formData(): Promise<FormData> {
    return this.resolve().then(getResponseParser('FormData'));
  }

  /**
   * Send the fetch request and resolve the response as plain text.
   * @returns A promise that resolves to the text response.
   * @preserve
   */
  text(): Promise<string> {
    return this.resolve().then(getResponseParser('Text'));
  }

  onError(status: number, catcher: ErrorCatcher) {
    const handlers = this.#catchers.get(status);
    if (handlers && handlers.size > 0) {
      handlers.add(catcher);
    } else {
      this.#catchers.set(status, new Set([catcher]));
    }
    return this;
  }

  /**
   * Handles 400 bad-request HTTP responses
   * @preserve
   */
  badRequest(catcher: ErrorCatcher) {
    return this.onError(400, catcher);
  }

  /**
   * Handles 401 unauthorized HTTP responses
   * @preserve
   */
  unauthorized(catcher: ErrorCatcher) {
    return this.onError(401, catcher);
  }

  /**
   * Handles 403 forbidden HTTP responses
   * @preserve
   */
  forbidden(catcher: ErrorCatcher) {
    return this.onError(403, catcher);
  }

  /**
   * Handles 404 not-found HTTP responses
   * @preserve
   */
  notFound(catcher: ErrorCatcher) {
    return this.onError(404, catcher);
  }

  /**
   * Handles 408 request-timeout HTTP responses
   * @preserve
   */
  timeout(catcher: ErrorCatcher) {
    return this.onError(408, catcher);
  }

  /**
   * Handles 500 internal-server-error HTTP responses
   * @preserve
   */
  serverError(catcher: ErrorCatcher) {
    return this.onError(500, catcher);
  }
}
