import { FetchResolver } from './FetchResolver';
import { getNewSearchParms } from '../internals/getNewSearchParms';
import { isJsonBody, shouldStringify } from '../internals/shouldStringify';
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
export class Fetchtastic implements ConfigurableFetch<Fetchtastic> {
  #url: URL | string; // Private property for storing the URL
  #headers = new Headers(); // Private property for storing the headers
  #searchParams = new URLSearchParams(); // Private property for storing the search parameters
  #body: BodyInit | null | unknown = null; // Private property for storing the request body
  #options: Omit<FetchtasticOptions, 'body' | 'headers'> = {}; // Private property for storing additional options
  #controller?: AbortController; // Private property for storing the AbortController

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

  /**
   * Creates a new instance of Fetchtastic.
   * @param baseUrl - The base URL for the requests.
   * @param controller - An optional AbortController to control the request cancellation.
   * @preserve
   */
  constructor(baseUrl?: string | URL, controller?: AbortController) {
    this.#url = baseUrl ?? '';
    if (controller) this.#controller = controller;
  }

  #cloneSearchParams() {
    const search = new URLSearchParams();
    this.#searchParams.forEach((value, name) => {
      search.append(name, value);
    });
    return search;
  }

  /**
   * Creates a clone of the current instance.
   */
  #clone(): Fetchtastic {
    const instace = new Fetchtastic(this.#url.toString(), this.#controller);
    instace.#headers = new Headers(this.#headers);
    instace.#searchParams = this.#cloneSearchParams();
    instace.#options = structuredClone(this.#options);
    instace.#body = isJsonBody(this.#body) ? structuredClone(this.#body) : this.#body;
    return instace;
  }

  #getResolver<Method extends HttpMethod>(
    method: Method,
    url?: string,
    body?: BodyInit | null | unknown,
  ) {
    const instance = url ? this.url(url) : this.#clone();
    if (body !== undefined) instance.#body = body;
    return new FetchResolver(instance, method);
  }

  /**
   * Adds an abort controller, in order to cancel the request if needed.
   * @param abortController - an `AbortController` instance
   * @preserve
   */
  controller(abortController: AbortController) {
    const instance = this.#clone();
    instance.#controller = abortController;
    return instance;
  }

  /**
   * Sets the headers for the request.
   * @param data - The headers data.
   * @param replace - Specifies whether to replace the existing headers (default: false).
   * @preserve
   */
  headers(data?: HeadersInit, replace = false) {
    const instance = this.#clone();
    const newHeaders = new Headers(data);
    if (!replace) {
      instance.#headers.forEach((value, key) => {
        if (!newHeaders.has(key)) {
          newHeaders.set(key, value);
        }
      });
    }
    instance.#headers = newHeaders;
    return instance;
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
    const instace = this.#clone();
    instace.#headers.append(name, value);
    return instace;
  }

  /**
   * Deletes a header from the request.
   * @param name - The name of the header to delete.
   * @preserve
   */
  deleteHeader(name: string) {
    const instace = this.#clone();
    if (instace.#headers.has(name)) {
      instace.#headers.delete(name);
    }
    return instace;
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
    const instace = this.#clone();
    if (replace || url instanceof URL) {
      instace.#url = url;
    } else {
      const oldURL = instace.#url.toString();
      const split = oldURL.split('?');
      instace.#url =
        split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url;
    }
    return instace;
  }

  /**
   * Sets the search parameters for the request.
   * @param data - The search parameters data.
   * @param replace - Specifies whether to replace the existing search parameters (default: false).
   * @preserve
   */
  searchParams(data?: SearchParamInput, replace = false) {
    const instance = this.#clone();
    let newSearchParams = new URLSearchParams();
    if (data) {
      newSearchParams = getNewSearchParms(data);
    }
    if (!replace) {
      instance.#searchParams.forEach((value, key) => {
        if (!newSearchParams.has(key)) {
          newSearchParams.set(key, value);
        }
      });
    }
    instance.#searchParams = newSearchParams;
    return instance;
  }

  /**
   * Appends a search parameter to the request.
   * @param name - The name of the search parameter.
   * @param value - The value of the search parameter.
   * @preserve
   */
  appendSearchParam(name: string, value: string | number | boolean) {
    const instance = this.#clone();
    instance.#searchParams.append(name, String(value));
    return instance;
  }

  /**
   * Deletes a search parameter from the request.
   * @param name - The name of the search parameter to delete.
   * @preserve
   */
  deleteSearchParam(name: string) {
    const instance = this.#clone();
    if (instance.#searchParams.has(name)) {
      instance.#searchParams.delete(name);
    }
    return instance;
  }

  /**
   * Sets the body for the request.
   * @param body - The body data.
   * @preserve
   */
  body(body: BodyInit | null | unknown) {
    const instance = this.#clone();
    instance.#body = body;
    return instance;
  }

  /**
   * Sets the options for the request.
   * @param options - The options for the request.
   * @param replace - Specifies whether to replace the existing options (default: false).
   * @preserve
   */
  setOptions(options: FetchtasticOptions, replace = false) {
    const { body, headers, ...otherOptions } = options;
    const instance = this.#clone();
    if (Object.prototype.hasOwnProperty.call(options, 'body')) {
      instance.#body = body ?? null;
    }
    if (Object.prototype.hasOwnProperty.call(options, 'headers')) {
      instance.headers(headers, replace);
    }
    instance.#options = replace
      ? otherOptions
      : { ...instance.#options, ...otherOptions };
    return instance;
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

    const options: FetchOptions = {
      ...this.#options,
      method,
      headers: this.#headers,
      body,
    };

    if (this.#controller) options.signal = this.#controller.signal;

    return options;
  }

  get(url?: string) {
    return this.#getResolver('GET', url);
  }

  post(url?: string, body?: BodyInit | null | unknown) {
    return this.#getResolver('POST', url, body);
  }

  put(url?: string, body?: BodyInit | null | unknown) {
    return this.#getResolver('PUT', url, body);
  }

  delete(url?: string, body?: BodyInit | null | unknown) {
    return this.#getResolver('DELETE', url, body);
  }

  options(url?: string, body?: BodyInit | null | unknown) {
    return this.#getResolver('OPTIONS', url, body);
  }

  patch(url?: string, body?: BodyInit | null | unknown) {
    return this.#getResolver('PATCH', url, body);
  }

  head(url?: string) {
    return this.#getResolver('HEAD', url);
  }
}
