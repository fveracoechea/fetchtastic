import { HttpError } from './HttpError.ts';
import { getNewSearchParms, getResponseParser, shouldStringify } from './internals.ts';
import {
  DataAssertionFn,
  FetchOptions,
  FetchRequestHeader,
  FetchtasticOptions,
  HttpMethod,
  SearchParamInput,
} from './types.ts';

export type ErrorCatcher = (
  error: HttpError,
  config: Fetchtastic,
) => void | Promise<Response | void>;

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
  #body: BodyInit | null | unknown;
  #catchers: Map<number | string, Set<ErrorCatcher>>;
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
    const instace = new Fetchtastic(this.#url.toString(), this.#controller);
    instace.#catchers = new Map(this.#catchers);
    instace.#headers = new Headers(this.#headers);
    instace.#searchParams = new URLSearchParams(this.#searchParams.toString());
    instace.#options = Object.assign({}, this.#options);
    instace.#body = this.#body;
    instace.#method = this.#method;
    return instace;
  }

  #setMethod<Method extends HttpMethod>(
    method: Method,
    url?: string,
    body?: BodyInit | null | unknown,
  ) {
    const instance = url ? this.url(url) : this.#clone();
    instance.#method = method;
    if (body !== undefined) instance.#body = body;
    return instance;
  }

  #getFinalRequestOptions(method: HttpMethod): FetchOptions {
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

  async #handleError(response: Response) {
    const promises: Promise<Response | void>[] = [];
    const catchers = this.#catchers.get(response.status);

    if (!catchers) {
      throw new HttpError(this.URL, this.method, response.clone());
    }

    for (const catcherFn of catchers) {
      const result = catcherFn(new HttpError(this.URL, this.method, response.clone()), this);
      if (result && result instanceof Promise) promises.push(result);
    }

    const results = await Promise.all(promises);
    return results.findLast(res => res instanceof Response);
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
  setHeaders(data?: HeadersInit, replace = false) {
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
   * Appends a header to the request, it uses `Headers.append` under the hood.
   * @param name - The name of the header.
   * @param value - The value of the header.
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
      instace.#url = split.length > 1 ? split[0] + url + '?' + split[1] : oldURL + url;
    }
    return instace;
  }

  /**
   * Sets the search parameters for the request.
   * @param data - The search parameters data.
   * @param replace - Specifies whether to replace the existing search parameters (default: false).
   */
  setSearchParams(data?: SearchParamInput, replace = false) {
    const instance = this.#clone();
    const newSearchParams = data ? getNewSearchParms(data) : new URLSearchParams();

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
   * @param name - The name of the search parameter to delete.
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
   */
  setBody(body: BodyInit | null | unknown) {
    const instance = this.#clone();
    instance.#body = body;
    return instance;
  }

  /**
   * Sets any custom settings that you want to apply to the request.
   * @param options - The options for the request.
   * @param replace - Specifies whether to replace the existing options (default: false).
   */
  setOptions(options: FetchtasticOptions, replace = false) {
    const instance = this.#clone();
    instance.#options = replace ? options : { ...instance.#options, ...options };
    return instance;
  }

  get(url?: string) {
    return this.#setMethod('GET', url);
  }

  post(url?: string, body?: BodyInit | null | unknown) {
    return this.#setMethod('POST', url, body);
  }

  put(url?: string, body?: BodyInit | null | unknown) {
    return this.#setMethod('PUT', url, body);
  }

  delete(url?: string, body?: BodyInit | null | unknown) {
    return this.#setMethod('DELETE', url, body);
  }

  options(url?: string, body?: BodyInit | null | unknown) {
    return this.#setMethod('OPTIONS', url, body);
  }

  patch(url?: string, body?: BodyInit | null | unknown) {
    return this.#setMethod('PATCH', url, body);
  }

  head(url?: string) {
    return this.#setMethod('HEAD', url);
  }

  /**
   * Resolves the fetch request and returns the response.
   * @returns A Promise that resolves to the fetch response.
   * @throws FetchError if the fetch request fails.
   */
  async resolve() {
    const options = this.#getFinalRequestOptions(this.method);
    const response = await fetch(this.URL, options);
    if (!response.ok) {
      const newResponse = await this.#handleError(response);
      if (newResponse) return newResponse;
    }
    return response;
  }

  /**
   * Send the fetch request and returns the response as JSON.
   * @param assertData Optional. A function to assert and transform the response data.
   * @returns A Promise that resolves to the JSON response.
   */
  json<T = unknown>(assertData?: DataAssertionFn<T>): Promise<T> {
    return this.resolve()
      .then(getResponseParser('JSON'))
      .then(json => {
        if (assertData) return assertData(json);
        return json;
      });
  }

  /**
   * Send the fetch request and returns the response as an ArrayBuffer.
   * @returns A Promise that resolves to the ArrayBuffer response.
   */
  arrayBuffer(): Promise<ArrayBuffer> {
    return this.resolve().then(getResponseParser('ArrayBuffer'));
  }

  /**
   * Resolves the fetch request and returns the response as a Blob.
   * @returns A Promise that resolves to the Blob response.
   */
  blob(): Promise<Blob> {
    return this.resolve().then(getResponseParser('Blob'));
  }

  /**
   * Resolves the fetch request and returns the response as a FormData.
   * @returns A Promise that resolves to the FormData response.
   */
  formData(): Promise<FormData> {
    return this.resolve().then(getResponseParser('FormData'));
  }

  /**
   * Send the fetch request and resolve the response as plain text.
   * @returns A promise that resolves to the text response.
   */
  text(): Promise<string> {
    return this.resolve().then(getResponseParser('Text'));
  }

  /**
   * Registers an given error handler for a specific status code.
   * @param status HTTP status code
   * @param catcher on-error callback function
   */
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
   */
  badRequest(catcher: ErrorCatcher) {
    return this.onError(400, catcher);
  }

  /**
   * Handles 401 unauthorized HTTP responses
   */
  unauthorized(catcher: ErrorCatcher) {
    return this.onError(401, catcher);
  }

  /**
   * Handles 403 forbidden HTTP responses
   */
  forbidden(catcher: ErrorCatcher) {
    return this.onError(403, catcher);
  }

  /**
   * Handles 404 not-found HTTP responses
   */
  notFound(catcher: ErrorCatcher) {
    return this.onError(404, catcher);
  }

  /**
   * Handles 408 request-timeout HTTP responses
   */
  timeout(catcher: ErrorCatcher) {
    return this.onError(408, catcher);
  }

  /**
   * Handles 500 internal-server-error HTTP responses
   */
  serverError(catcher: ErrorCatcher) {
    return this.onError(500, catcher);
  }
}