import { Fetchtastic } from './Fetchtastic';
import { FetchError } from './FetchError';
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
export class FetchResolver<Method extends HttpMethod> implements ConfigurableFetch {
  #config: Fetchtastic;
  #method: Method;

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
      this.#config = Fetchtastic.clone(this.#config).url(url, replace);
    } else {
      this.#config = Fetchtastic.clone(this.#config).url(url);
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
    this.#config = Fetchtastic.clone(this.#config).headers(data, replace);
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
    this.#config = Fetchtastic.clone(this.#config).appendHeader(name, value);
    return this;
  }

  /**
   * Deletes a header from the fetch request.
   * @param name The name of the header to delete.
   * @preserve
   */
  deleteHeader(name: string) {
    this.#config = Fetchtastic.clone(this.#config).deleteHeader(name);
    return this;
  }

  /**
   * Sets the search parameters for the fetch request.
   * @param data The search parameters data to set.
   * @param replace Optional. Specifies whether to replace the current search parameters or append to them.
   * @preserve
   */
  searchParams(data?: SearchParamInput, replace?: boolean) {
    this.#config = Fetchtastic.clone(this.#config).searchParams(data, replace);
    return this;
  }

  /**
   * Appends a search parameter to the fetch request.
   * @param name The name of the search parameter.
   * @param value The value of the search parameter.
   * @preserve
   */
  appendSearchParam(name: string, value: string | number | boolean): this {
    this.#config = Fetchtastic.clone(this.#config).appendSearchParam(name, value);
    return this;
  }
  /**
   * Deletes a search parameter from the fetch request.
   * @param name The name of the search parameter to delete.
   * @returns The updated FetchResolver instance.
   * @preserve
   */
  deleteSearchParam(name: string): this {
    this.#config = Fetchtastic.clone(this.#config).deleteSearchParam(name);
    return this;
  }

  /**
   * Sets the request body for the fetch request.
   * @param body The request body to set.
   * @preserve
   */
  body(body: unknown) {
    this.#config = Fetchtastic.clone(this.#config).body(body);
    return this;
  }

  /**
   * Sets the options for the fetch request.
   * @param options The options to set.
   * @param replace Optional. Specifies whether to replace the current options or merge them.
   * @preserve
   */
  setOptions(options: FetchtasticOptions, replace?: boolean) {
    this.#config = Fetchtastic.clone(this.#config).setOptions(options, replace);
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
    try {
      const response = await fetch(this.#config.URL, options);
      if (!response.ok) {
        throw new FetchError(this.#config.URL, this.method, response);
      }
      return response;
    } catch (error) {
      if (error instanceof FetchError) {
        throw error;
      } else if (error instanceof Error) {
        throw new FetchError(
          this.#config.URL,
          this.#method,
          undefined,
          error.message,
        );
      } else {
        throw new FetchError(this.#config.URL, this.method);
      }
    }
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
}
