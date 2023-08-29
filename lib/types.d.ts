declare const HttpMethods: readonly ["OPTIONS", "GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"];
declare const ResponseParsers: readonly ["ArrayBuffer", "Blob", "FormData", "JSON", "Text"];

type HttpMethod = (typeof HttpMethods)[number];
type ResponseParser = (typeof ResponseParsers)[number];
type SearchParamInput = string | URLSearchParams | [string, string | boolean | number][] | Record<string, string | boolean | number>;
type FetchtasticOptions = Omit<RequestInit, 'signal' | 'method'>;
interface FetchOptions extends RequestInit {
    method: HttpMethod;
}
type FetchRequestHeader = 'Accept' | 'Content-Type' | 'Authorization' | 'User-Agent' | 'Referer' | 'Cache-Control' | 'Accept-Encoding' | 'Origin' | 'Connection' | 'Cookie' | 'Pragma' | 'If-Modified-Since';
type DataAssertionFn<T = unknown> = (data: unknown) => T;

/**
 * Represents an error that occurs during an HTTP request made with Fetchtastic.
 * It encapsulates information about the error,
 * including the request URL, status code, response details, and error message.
 *
 * @extends Error
 */
declare class HttpError extends Error {
    #private;
    /**
     * HTTP status code associated with the error.
     */
    status: number;
    /**
     * Indicates the HTTP method used in the failed request.
     */
    method: HttpMethod;
    /**
     * Refers to the `Response` object received from the failed request.
     */
    response: Response;
    /**
     * Stores the URL of the failed request.
     */
    url: string;
    constructor(url: string, method: HttpMethod, response: Response, message?: string);
}

type ErrorCatcher = (error: HttpError, config: Fetchtastic) => void | Promise<Response | void>;
/**
 * Represents a configurable Fetchtastic instance that can be used to make HTTP requests.
 * Implements the `ConfigurableFetch` interface.
 * @preserve
 */
declare class Fetchtastic {
    #private;
    /**
     * Gets the URL with search parameters.
     */
    get URL(): string;
    /**
     * Gets the search parameters as a JSON object.
     */
    get searchParamsJSON(): Record<string, string>;
    /**
     * Gets the headers as a JSON object.
     */
    get headersJSON(): Record<string, string>;
    /**
     * Gets the HTTP method associated with this request.
     */
    get method(): "OPTIONS" | "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "PATCH";
    /**
     * Creates a new instance of Fetchtastic.
     * @param baseUrl - The base URL for the requests.
     * @param controller - An optional AbortController to control the request cancellation.
     */
    constructor(baseUrl?: string | URL, controller?: AbortController);
    /**
     * Registers an abort controller, in order to cancel the request if needed.
     * @param abortController - an `AbortController` instance
     */
    controller(abortController: AbortController): Fetchtastic;
    /**
     * Sets the headers for the request.
     * @param data - The headers data.
     * @param replace - Specifies whether to replace the existing headers (default: false).
     */
    headers(data?: HeadersInit, replace?: boolean): Fetchtastic;
    /**
     * Appends a header to the request.
     * @param name - The name of the header.
     * @param value - The value of the header.
     */
    appendHeader(name: FetchRequestHeader, value: string): this;
    appendHeader(name: string, value: string): this;
    /**
     * Deletes a header from the request.
     * @param name - The name of the header to delete.
     */
    deleteHeader(name: string): Fetchtastic;
    /**
     * Sets the URL for the request.
     * @param url - The URL for the request.
     * @param replace - Specifies whether to replace the existing URL (default: false).
     */
    url(url: URL): this;
    url(url: string, replace?: boolean): this;
    /**
     * Sets the search parameters for the request.
     * @param data - The search parameters data.
     * @param replace - Specifies whether to replace the existing search parameters (default: false).
     */
    searchParams(data?: SearchParamInput, replace?: boolean): Fetchtastic;
    /**
     * Appends a search parameter to the request.
     * @param name - The name of the search parameter.
     * @param value - The value of the search parameter.
     */
    appendSearchParam(name: string, value: string | number | boolean): Fetchtastic;
    /**
     * Deletes a search parameter from the request.
     * @param name - The name of the search parameter to delete.
     */
    deleteSearchParam(name: string): Fetchtastic;
    /**
     * Sets the body for the request.
     * @param body - The body data.
     */
    body(body: BodyInit | null | unknown): Fetchtastic;
    /**
     * Sets the options for the request.
     * @param options - The options for the request.
     * @param replace - Specifies whether to replace the existing options (default: false).
     */
    setOptions(options: FetchtasticOptions, replace?: boolean): Fetchtastic;
    /**
     * Gets the options for the request.
     * @param method - The HTTP method for the request.
     */
    getOptions(method: HttpMethod): FetchOptions;
    get(url?: string): Fetchtastic;
    post(url?: string, body?: BodyInit | null | unknown): Fetchtastic;
    put(url?: string, body?: BodyInit | null | unknown): Fetchtastic;
    delete(url?: string, body?: BodyInit | null | unknown): Fetchtastic;
    options(url?: string, body?: BodyInit | null | unknown): Fetchtastic;
    patch(url?: string, body?: BodyInit | null | unknown): Fetchtastic;
    head(url?: string): Fetchtastic;
    /**
     * Resolves the fetch request and returns the response.
     * @returns A Promise that resolves to the fetch response.
     * @throws FetchError if the fetch request fails.
     */
    resolve(): Promise<Response>;
    /**
     * Send the fetch request and returns the response as JSON.
     * @param assertData Optional. A function to assert and transform the response data.
     * @returns A Promise that resolves to the JSON response.
     */
    json<T = unknown>(assertData?: DataAssertionFn<T>): Promise<T>;
    /**
     * Send the fetch request and returns the response as an ArrayBuffer.
     * @returns A Promise that resolves to the ArrayBuffer response.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Resolves the fetch request and returns the response as a Blob.
     * @returns A Promise that resolves to the Blob response.
     */
    blob(): Promise<Blob>;
    /**
     * Resolves the fetch request and returns the response as a FormData.
     * @returns A Promise that resolves to the FormData response.
     */
    formData(): Promise<FormData>;
    /**
     * Send the fetch request and resolve the response as plain text.
     * @returns A promise that resolves to the text response.
     */
    text(): Promise<string>;
    /**
     * Registers an given error handler for a specific status code.
     * @param status HTTP status code
     * @param catcher on-error callback function
     */
    onError(status: number, catcher: ErrorCatcher): this;
    /**
     * Handles 400 bad-request HTTP responses
     */
    badRequest(catcher: ErrorCatcher): this;
    /**
     * Handles 401 unauthorized HTTP responses
     */
    unauthorized(catcher: ErrorCatcher): this;
    /**
     * Handles 403 forbidden HTTP responses
     */
    forbidden(catcher: ErrorCatcher): this;
    /**
     * Handles 404 not-found HTTP responses
     */
    notFound(catcher: ErrorCatcher): this;
    /**
     * Handles 408 request-timeout HTTP responses
     */
    timeout(catcher: ErrorCatcher): this;
    /**
     * Handles 500 internal-server-error HTTP responses
     */
    serverError(catcher: ErrorCatcher): this;
}

/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * Performs left-to-right function composition,
 * where the first argument is a value,
 * and the remaining arguments must be unary functions.
 *
 *
 * @example
 * import { pipe } from 'fetchtastic/utils'
 *
 * const length = (s: string) => s.length
 * const addOne = (n: number) => n + 1
 * const double = (n: number) => n * 2
 *
 * // without pipe
 * double(addOne(length('aaa'))); // 8
 *
 * // with pipe
 * pipe('aaa', length, addOne, double); // 8
 */
declare function pipe<A>(a: A): A;
declare function pipe<A, B>(a: A, ab: (a: A) => B): B;
declare function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
declare function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
declare function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
declare function pipe<A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): F;
declare function pipe<A, B, C, D, E, F, G>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): G;
declare function pipe<A, B, C, D, E, F, G, H>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): H;
declare function pipe<A, B, C, D, E, F, G, H, I>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): I;
declare function pipe<A, B, C, D, E, F, G, H, I, J>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): J;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K): K;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L): L;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M): M;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N): N;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O): O;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P): P;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q): Q;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R): R;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S): S;
declare function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T): T;

/**
 * Identity, function that returns the same argument passed to it
 */
declare const identity: <T = unknown>(data: T) => T;
/**
 * No operation
 */
declare const noop: (..._any: unknown[]) => undefined;
/**
 * Returns `true` if the given value is a valid `HttpMethod`
 */
declare function isHttpMethod(value: unknown): value is HttpMethod;

declare const StatusCodes: Map<number, string>;

export { type DataAssertionFn, type ErrorCatcher, type FetchOptions, type FetchRequestHeader, Fetchtastic, type FetchtasticOptions, HttpError, type HttpMethod, type ResponseParser, type SearchParamInput, StatusCodes, identity, isHttpMethod, noop, pipe };
