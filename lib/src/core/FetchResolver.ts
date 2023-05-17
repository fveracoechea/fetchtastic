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

export class FetchResolver<Method extends HttpMethod> implements ConfigurableFetch {
  #config: Fetchtastic;
  #method: Method;

  get method() {
    return this.#method;
  }

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

  headers(data?: HeadersInit, replace?: boolean) {
    this.#config = Fetchtastic.clone(this.#config).headers(data, replace);
    return this;
  }

  appendHeader(name: FetchRequestHeader, value: string): this;
  appendHeader(name: string, value: string) {
    this.#config = Fetchtastic.clone(this.#config).appendHeader(name, value);
    return this;
  }

  deleteHeader(name: string) {
    this.#config = Fetchtastic.clone(this.#config).deleteHeader(name);
    return this;
  }

  searchParams(data?: SearchParamInput, replace?: boolean) {
    this.#config = Fetchtastic.clone(this.#config).searchParams(data, replace);
    return this;
  }

  appendSearchParam(name: string, value: string | number | boolean): this {
    this.#config = Fetchtastic.clone(this.#config).appendSearchParam(name, value);
    return this;
  }

  deleteSearchParam(name: string): this {
    this.#config = Fetchtastic.clone(this.#config).deleteSearchParam(name);
    return this;
  }

  body(body: unknown) {
    this.#config = Fetchtastic.clone(this.#config).body(body);
    return this;
  }

  setOptions(options: FetchtasticOptions, replace?: boolean) {
    this.#config = Fetchtastic.clone(this.#config).setOptions(options, replace);
    return this;
  }

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

  json<T = unknown>(assertData?: DataAssertionFn<T>): Promise<T> {
    const assertFn = (assertData ?? identity) as DataAssertionFn<T>;
    return this.resolve().then(getResponseParser('JSON')).then(assertFn);
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    return this.resolve().then(getResponseParser('ArrayBuffer'));
  }

  blob(): Promise<Blob> {
    return this.resolve().then(getResponseParser('Blob'));
  }

  formData(): Promise<FormData> {
    return this.resolve().then(getResponseParser('FormData'));
  }

  text(): Promise<string> {
    return this.resolve().then(getResponseParser('Text'));
  }
}
