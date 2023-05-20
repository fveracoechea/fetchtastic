import { FetchResolver } from './FetchResolver';
import { getNewSearchParms } from '../internals/getNewSearchParms';
import { shouldStringify } from '../internals/shouldStringify';
import {
  FetchRequestHeader,
  SearchParamInput,
  FetchtasticOptions,
  HttpMethod,
  FetchOptions,
  ConfigurableFetch,
} from './types';

/**
 * Represents a configurable Fetchtastic instance that can be used to make HTTP requests.
 * Implements the `ConfigurableFetch` interface.
 * @preserve
 */
export class Fetchtastic implements ConfigurableFetch {
  /**
   * Creates a clone of the given Fetchtastic instance.
   * @param instance - The Fetchtastic instance to clone.
   * @returns A new Fetchtastic instance with the same properties as the original instance.
   * @preserve
   */
  static clone(instace: Fetchtastic) {
    return new Fetchtastic(instace.#url.toString())
      .headers(new Headers(instace.#headers), true)
      .body(structuredClone(instace.#body))
      .setOptions(structuredClone(instace.#options), true);
  }

  #url: URL | string; // Private property for storing the URL
  #headers = new Headers(); // Private property for storing the headers
  #searchParams = new URLSearchParams(); // Private property for storing the search parameters
  #body: BodyInit | null | unknown = null; // Private property for storing the request body
  #options: Omit<FetchtasticOptions, 'body' | 'headers'> = {}; // Private property for storing additional options
  controller: AbortController; // Public property for storing the AbortController

  /**
   * Gets the URL with search parameters.
   * @preserve
   */
  get URL() {
    const search = this.#searchParams.toString();
    return search ? `${this.#url.toString()}?${search}` : this.#url.toString();
  }

  /**
   * Gets the search parameters as a JSON object.
   * @preserve
   */
  get searchParamsJSON() {
    const json: Record<string, string> = {};
    this.#searchParams.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  }

  /**
   * Gets the headers as a JSON object.
   * @preserve
   */
  get headersJSON() {
    const json: Record<string, string> = {};
    this.#headers.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  }

  get get() {
    return new FetchResolver(Fetchtastic.clone(this), 'GET');
  }

  get post() {
    return new FetchResolver(Fetchtastic.clone(this), 'POST');
  }

  get put() {
    return new FetchResolver(Fetchtastic.clone(this), 'PUT');
  }

  get delete() {
    return new FetchResolver(Fetchtastic.clone(this), 'DELETE');
  }

  get options() {
    return new FetchResolver(Fetchtastic.clone(this), 'OPTIONS');
  }

  get patch() {
    return new FetchResolver(Fetchtastic.clone(this), 'PATCH');
  }

  get head() {
    return new FetchResolver(Fetchtastic.clone(this), 'HEAD');
  }

  /**
   * Creates a new instance of Fetchtastic.
   * @param baseUrl - The base URL for the requests.
   * @param controller - An optional AbortController to control the request cancellation.
   * @preserve
   */
  constructor(baseUrl?: string | URL, controller?: AbortController) {
    this.#url = baseUrl ?? '';
    this.controller = controller ?? new AbortController();
  }

  /**
   * Sets the headers for the request.
   * @param data - The headers data.
   * @param replace - Specifies whether to replace the existing headers (default: false).
   * @preserve
   */
  headers(data?: HeadersInit, replace = false) {
    const newHeaders = new Headers(data);
    if (!replace) {
      this.#headers.forEach((value, key) => {
        if (!newHeaders.has(key)) {
          newHeaders.set(key, value);
        }
      });
    }
    this.#headers = newHeaders;
    return this;
  }

  /**
   * Appends a header to the request.
   * @param name - The name of the header.
   * @param value - The value of the header.
   * @preserve
   */
  appendHeader(name: FetchRequestHeader, value: string): this;
  appendHeader(name: string, value: string): this;
  appendHeader(name: string, value: string) {
    this.#headers.append(name, value);
    return this;
  }

  /**
   * Deletes a header from the request.
   * @param name - The name of the header to delete.
   * @preserve
   */
  deleteHeader(name: string) {
    if (this.#headers.has(name)) {
      this.#headers.delete(name);
    }
    return this;
  }

  /**
   * Sets the URL for the request.
   * @param url - The URL for the request.
   * @param replace - Specifies whether to replace the existing URL (default: false).
   * @preserve
   */
  url(url: URL): this;
  url(url: string, replace?: boolean): this;
  url(url: string | URL, replace = false) {
    if (replace || url instanceof URL) {
      this.#url = url;
    } else {
      const oldURL = this.#url.toString();
      const split = oldURL.split('?');
      this.#url = split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url;
    }
    return this;
  }

  /**
   * Sets the search parameters for the request.
   * @param data - The search parameters data.
   * @param replace - Specifies whether to replace the existing search parameters (default: false).
   * @preserve
   */
  searchParams(data?: SearchParamInput, replace = false) {
    let newSearchParams = new URLSearchParams();
    if (data) {
      newSearchParams = getNewSearchParms(data);
    }
    if (!replace) {
      this.#searchParams.forEach((value, key) => {
        if (!newSearchParams.has(key)) {
          newSearchParams.set(key, value);
        }
      });
    }
    this.#searchParams = newSearchParams;
    return this;
  }

  /**
   * Appends a search parameter to the request.
   * @param name - The name of the search parameter.
   * @param value - The value of the search parameter.
   * @preserve
   */
  appendSearchParam(name: string, value: string | number | boolean) {
    this.#searchParams.append(name, String(value));
    return this;
  }

  /**
   * Deletes a search parameter from the request.
   * @param name - The name of the search parameter to delete.
   * @preserve
   */
  deleteSearchParam(name: string) {
    if (this.#searchParams.has(name)) {
      this.#searchParams.delete(name);
    }
    return this;
  }

  /**
   * Sets the body for the request.
   * @param body - The body data.
   * @preserve
   */
  body(body: BodyInit | null | unknown) {
    this.#body = body;
    return this;
  }

  /**
   * Sets the options for the request.
   * @param options - The options for the request.
   * @param replace - Specifies whether to replace the existing options (default: false).
   * @preserve
   */
  setOptions(options: FetchtasticOptions, replace = false) {
    const { body, headers, ...otherOptions } = options;
    if (Object.prototype.hasOwnProperty.call(options, 'body')) {
      this.#body = body ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(options, 'headers')) {
      this.headers(headers, replace);
    }
    this.#options = replace ? otherOptions : { ...this.#options, ...otherOptions };
    return this;
  }

  /**
   * Gets the options for the request.
   * @param method - The HTTP method for the request.
   * @preserve
   */
  getOptions(method: HttpMethod): FetchOptions {
    let body: BodyInit | null;
    if (this.#body && shouldStringify(this.#body, this.#headers)) {
      body = JSON.stringify(this.#body);
    } else {
      body = (this.#body ?? null) as BodyInit | null;
    }

    return {
      ...this.#options,
      method,
      signal: this.controller.signal,
      headers: this.#headers,
      body,
    };
  }
}
