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

export class Fetchtastic implements ConfigurableFetch {
  static clone(instace: Fetchtastic) {
    return new Fetchtastic(instace.#url.toString())
      .headers(new Headers(instace.#headers), true)
      .body(structuredClone(instace.#body))
      .setOptions(structuredClone(instace.#options), true);
  }

  #url: URL | string;
  #headers = new Headers();
  #searchParams = new URLSearchParams();
  #body: BodyInit | null | unknown = null;
  #options: Omit<FetchtasticOptions, 'body' | 'headers'> = {};
  controller: AbortController;

  get URL() {
    const search = this.#searchParams.toString();
    return search ? `${this.#url.toString()}?${search}` : this.#url.toString();
  }

  get jsonSearchParams() {
    const json: Record<string, string> = {};
    this.#searchParams.forEach((value, key) => {
      json[key] = value;
    });
    return json;
  }

  get jsonHeaders() {
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

  constructor(baseUrl?: string | URL, controller?: AbortController) {
    this.#url = baseUrl ?? '';
    this.controller = controller ?? new AbortController();
  }

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

  appendHeader(name: FetchRequestHeader, value: string): this;
  appendHeader(name: string, value: string): this;
  appendHeader(name: string, value: string) {
    this.#headers.append(name, value);
    return this;
  }

  deleteHeader(name: string) {
    if (this.#headers.has(name)) {
      this.#headers.delete(name);
    }
    return this;
  }

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

  appendSearchParam(name: string, value: string | number | boolean) {
    this.#searchParams.append(name, String(value));
    return this;
  }

  deleteSearchParam(name: string) {
    if (this.#searchParams.has(name)) {
      this.#searchParams.delete(name);
    }
    return this;
  }

  body(body: BodyInit | null | unknown) {
    this.#body = body;
    return this;
  }

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
