import { ResponseError } from './ResponseError.ts';
import { getNewSearchParms, shouldStringify } from './internals.ts';
import {
  CatcherCallback,
  DataAssertionFn,
  FetchRequestHeader,
  FetchtasticOptions,
  HttpMethod,
  SearchParamInput,
} from './types.ts';

/**
 * Represents an HTTP request configuration.
 * It provides methods for setting headers, URL parameters, request body, and other options.
 * It also provides convenience methods for performing common HTTP methods such as:
 * GET, POST, PUT, DELETE, OPTIONS, PATCH, and HEAD.
 */
export class Fetchtastic {
  #url: URL | string;
  #headers = new Headers();
  #method: HttpMethod;
  #controller?: AbortController;
  #searchParams: URLSearchParams;
  #body: unknown;
  #catchers: Map<number | string, CatcherCallback>;
  #options: FetchtasticOptions;

  /**
   * URL of the request, including any URL parameters.
   */
  get URL() {
    const search = this.#searchParams.toString();
    return search ? `${this.#url.toString()}?${search}` : this.#url.toString();
  }

  /**
   * Gets the URL search parameters.
   */
  get searchParams() {
    return this.#searchParams;
  }

  /**
   * Gets the request headers.
   */
  get headers() {
    return this.#headers;
  }

  /**
   * HTTP method associated with the request.
   */
  get method() {
    return this.#method;
  }

  /**
   * An object containing custom settings applied to the request.
   * */
  get requestOptions() {
    return this.#options;
  }

  /**
   * Body of the request.
   * It can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams,
   * a string, or a ReadableStream object.
   * Note that a request using the GET or HEAD method cannot have a body.
   * @param body - The body data.
   */
  get body() {
    return this.#body;
  }

  /**
   * Creates a new instance of Fetchtastic.
   * @param baseUrl - The base `URL` for the requests.
   * @param controller - An optional `AbortController` instance for aborting the request.
   */
  constructor(baseUrl?: string | URL, controller?: AbortController) {
    this.#body = null;
    this.#options = {};
    this.#method = 'GET';
    this.#url = baseUrl ?? '';
    this.#catchers = new Map();
    this.#searchParams = new URLSearchParams();
    this.json = this.json.bind(this);
    this.arrayBuffer = this.arrayBuffer.bind(this);
    this.blob = this.blob.bind(this);
    this.formData = this.formData.bind(this);
    this.text = this.text.bind(this);
    this.resolve = this.resolve.bind(this);
    if (controller) this.#controller = controller;
  }

  #clone() {
    const instance = new Fetchtastic(this.#url.toString(), this.#controller);
    instance.#catchers = new Map(this.#catchers);
    instance.#headers = new Headers(this.#headers);
    instance.#searchParams = new URLSearchParams(this.#searchParams.toString());
    instance.#options = { ...this.#options };
    instance.#body = this.#body;
    instance.#method = this.#method;
    return instance;
  }

  #setMethod<Method extends HttpMethod>(
    method: Method,
    body?: unknown,
    url = '',
  ) {
    const instance = url ? this.url(url) : this.#clone();
    instance.#method = method;
    if (body !== undefined) instance.#body = body;
    return instance;
  }

  #getFinalRequestOptions(method: HttpMethod): RequestInit {
    let body: BodyInit | null;
    if (this.#body && shouldStringify(this.#body, this.#headers)) {
      body = JSON.stringify(this.#body);
    } else {
      body = (this.#body ?? null) as BodyInit | null;
    }

    const options: RequestInit = {
      ...this.#options,
      method,
      headers: this.#headers,
      body,
    };

    if (this.#controller) options.signal = this.#controller.signal;
    return options;
  }

  #handleError(response: Response) {
    const catcher = this.#catchers.get(response.status);
    const res = response.clone();

    if (!catcher) {
      throw new ResponseError(res, this.method);
    }

    return catcher(new ResponseError(res, this.method), this);
  }

  /**
   * Registers an abort controller, in order to cancel the request if needed.
   * @param abortController - an `AbortController` instance
   * @link https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  controller(abortController: AbortController) {
    const instance = this.#clone();
    instance.#controller = abortController;
    return instance;
  }

  /**
   * Sets the headers of the request, it uses `Headers.set` behind the scenes.
   * @param data - The headers data.
   * @param replace - Specifies whether to replace the existing headers (default: false).
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Headers/set
   */
  setHeaders(headers?: HeadersInit, replace = false) {
    const instance = this.#clone();
    const newHeaders = new Headers(headers);
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
   * Appends a header to the request, it uses `Headers.append` under the hood.
   * @param name - The name of the header.
   * @param value - The value of the header.
   */
  appendHeader(name: FetchRequestHeader, value: string): this;
  appendHeader(name: string, value: string): this;
  appendHeader(name: string, value: string) {
    const instance = this.#clone();
    instance.#headers.append(name, value);
    return instance;
  }

  /**
   * Deletes a header from the request.
   * @param name - The name of the header to delete.
   */
  deleteHeader(name: string) {
    const instance = this.#clone();
    if (instance.#headers.has(name)) {
      instance.#headers.delete(name);
    }
    return instance;
  }

  /**
   * Sets or modifies the URL in the request configuration.
   *
   * @param {URL|string} url - The new URL or a string to append to the existing URL.
   * @param {boolean} [replace=false] - If `true`, replaces the existing URL with the new string; otherwise, appends the string to the existing URL.
   * @returns {this} A new instance with the updated URL configuration.
   *
   * @example
   * ```ts
   * const request = new Fetchtastic()
   * request.url(new URL('https://example.com'));
   *
   * // Append a string to the existing URL
   * request.url('/path');
   *
   * // Replace the existing URL with a new string
   * request.url('/newpath', true);
   * ```
   */
  url(url: URL): this;
  url(url: string, replace?: boolean): this;
  url(url: string | URL, replace = false) {
    const instance = this.#clone();
    if (replace || url instanceof URL) {
      instance.#url = url;
    } else {
      const oldURL = instance.#url.toString();
      const split = oldURL.split('?');
      instance.#url =
        split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url;
    }
    return instance;
  }

  /**
   * Sets the search parameters for the request.
   * @param data - The URL parameters to set.
   * @param replace - Specifies whether to replace the existing search parameters (default: false).
   */
  setSearchParams(data: SearchParamInput, replace = false) {
    const instance = this.#clone();
    const newSearchParams = getNewSearchParms(data);

    if (!replace) {
      for (const [key] of instance.#searchParams) {
        if (!newSearchParams.has(key)) {
          const values = instance.#searchParams.getAll(key);
          for (const value of values) {
            newSearchParams.append(key, value);
          }
        }
      }
    }

    instance.#searchParams = newSearchParams;
    return instance;
  }

  /**
   * Appends a search parameter to the request.
   * @param name - The name of the search parameter.
   * @param value - The value of the search parameter.
   */
  appendSearchParam(name: string, value: string | number | boolean) {
    const instance = this.#clone();
    instance.#searchParams.append(name, String(value));
    return instance;
  }

  /**
   * Deletes a search parameter from the request.
   * @param name - The name of the search parameter to deletee
   */
  deleteSearchParam(name: string) {
    const instance = this.#clone();
    if (instance.#searchParams.has(name)) {
      instance.#searchParams.delete(name);
    }
    return instance;
  }

  /**
   * Sets the body of the request.
   * It can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams,
   * a string, or a ReadableStream object.
   * Note that a request using the GET or HEAD method cannot have a body.
   * @param body - The body data.
   */
  setBody(body: unknown) {
    const instance = this.#clone();
    instance.#body = body;
    return instance;
  }

  /**
   * Sets any custom settings that you want to apply to the request.
   * @param options - The options to set.
   * @param replace - Specifies whether to replace the existing options (default: false).
   */
  setOptions(options: FetchtasticOptions, replace = false) {
    const instance = this.#clone();
    instance.#options = replace
      ? options
      : { ...instance.#options, ...options };
    return instance;
  }

  /**
   * Sets the HTTP method to GET and optionally sets the request URL.
   *
   * @param {string} [url] - If provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated GET request configuration.
   * */
  get(url?: string) {
    return this.#setMethod('GET', url);
  }

  /**
   * Sets the HTTP method to POST and optionally sets the request URL and body.
   *
   * @param {unknown} [body] - The body of the POST request. If not provided, the existing body is used.
   * @param {string} [url] - Appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated POST request configuration.
   *
   * */
  post(body?: unknown, url?: string) {
    return this.#setMethod('POST', body, url);
  }

  /**
   * Sets the HTTP method to PUT and optionally sets the request URL and body.
   *
   * @param {unknown} [body] - The body of the PUT request. If not provided, the existing body is used.
   * @param {string} [url] - if provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated PUT request configuration.
   * */
  put(body?: unknown, url?: string) {
    return this.#setMethod('PUT', body, url);
  }

  /**
   * Sets the HTTP method to DELETE and optionally sets the request URL and body.
   *
   * @param {unknown} [body] - The body of the DELETE request. If not provided, the existing body is used.
   * @param {string} [url] - if provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated DELETE request configuration.
   * */
  delete(body?: unknown, url?: string) {
    return this.#setMethod('DELETE', body, url);
  }

  /**
   * Sets the HTTP method to OPTIONS and optionally sets the request URL and body.
   *
   * @param {unknown} [body] - The body of the OPTIONS request. If not provided, the existing body is used.
   * @param {string} [url] - if provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated OPTIONS request configuration.
   * */
  options(body?: unknown, url?: string) {
    return this.#setMethod('OPTIONS', body, url);
  }

  /**
   * Sets the HTTP method to PATCH and optionally sets the request URL and body.
   *
   * @param {unknown} [body] - The body of the PATCH request. If not provided, the existing body is used.
   * @param {string} [url] - if provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated PATCH request configuration.
   * */
  patch(body?: unknown, url?: string) {
    return this.#setMethod('PATCH', body, url);
  }

  /**
   * Sets the HTTP method to HEAD and optionally sets the request URL.
   *
   * @param {string} [url] - if provided appends to the existing URL.
   * @returns {Fetchtastic} A new instance with the updated HEAD request configuration.
   * */
  head(url?: string) {
    return this.#setMethod('HEAD', url);
  }

  /**
   * Resolves the fetch request and returns the `Response`
   * @throws `ResponseError` if the fetch request fails.
   */
  async resolve() {
    const response = await fetch(
      this.URL,
      this.#getFinalRequestOptions(this.method),
    );
    if (!response.ok) {
      const newResponse = await this.#handleError(response);
      if (newResponse) return newResponse;
    }
    return response;
  }

  /**
   * Sends the request and returns the response as a `JSON` object.
   * @param assertData Optional. A function to assert and transform the response data.
   */
  async json<T = unknown>(assertData?: DataAssertionFn<T>): Promise<T> {
    const json = await (await this.resolve()).json();
    if (assertData) return assertData(json);
    return json;
  }

  /**
   * Sends the fetch request and returns the response as an `ArrayBuffer`.
   */
  arrayBuffer() {
    return this.resolve().then(res => res.arrayBuffer());
  }

  /**
   * Resolves the fetch request and returns the response as a `Blob`.
   */
  blob() {
    return this.resolve().then(res => res.blob());
  }

  /**
   * Resolves the fetch request and returns the response as a `FormData`.
   */
  formData() {
    return this.resolve().then(res => res.formData());
  }

  /**
   * Sends the fetch request and resolve the response as plain text.
   */
  text() {
    return this.resolve().then(res => res.text());
  }

  /**
   * Registers an given error handler for a specific status code.
   * @param status HTTP status code
   * @param catcher on-error callback function
   */
  onError(status: number, catcher: CatcherCallback) {
    this.#catchers.set(status, catcher);
    return this;
  }

  /**
   * Handles 400 bad-request HTTP responses
   */
  badRequest(catcher: CatcherCallback) {
    return this.onError(400, catcher);
  }

  /**
   * Handles 401 unauthorized HTTP responses
   */
  unauthorized(catcher: CatcherCallback) {
    return this.onError(401, catcher);
  }

  /**
   * Handles 403 forbidden HTTP responses
   */
  forbidden(catcher: CatcherCallback) {
    return this.onError(403, catcher);
  }

  /**
   * Handles 404 not-found HTTP responses
   */
  notFound(catcher: CatcherCallback) {
    return this.onError(404, catcher);
  }

  /**
   * Handles 408 request-timeout HTTP responses
   */
  timeout(catcher: CatcherCallback) {
    return this.onError(408, catcher);
  }

  /**
   * Handles 500 internal-server-error HTTP responses
   */
  serverError(catcher: CatcherCallback) {
    return this.onError(500, catcher);
  }
}
