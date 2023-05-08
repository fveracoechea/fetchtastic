import { DataGrab } from './DataGrab';
import { DataGrabError } from './DataGrabError';
import { getResponseParser } from '../internals/getResponseParser';
import { identity } from '../utils/helpers';
import { HttpMethod, DataAssertionFn } from './types';

export class DataGrabResolver<Method extends HttpMethod> {
  #config: DataGrab;
  #method: Method;

  get method() {
    return this.#method;
  }

  constructor(config: DataGrab, method: Method) {
    this.#config = config;
    this.#method = method;

    this.json = this.json.bind(this);
    this.arrayBuffer = this.arrayBuffer.bind(this);
    this.blob = this.blob.bind(this);
    this.formData = this.formData.bind(this);
    this.text = this.text.bind(this);
    this.resolve = this.resolve.bind(this);
  }

  setConfig(updateFn: (config: DataGrab) => void) {
    updateFn(this.#config);
    return this;
  }

  async resolve() {
    const options = this.#config.getOptions(this.method);
    try {
      const response = await fetch(this.#config.url, options);
      if (!response.ok) {
        throw new DataGrabError(this.#config.url, this.method, response);
      }
      return response;
    } catch (error) {
      if (error instanceof DataGrabError) {
        throw error;
      } else if (error instanceof Error) {
        throw new DataGrabError(
          this.#config.url,
          this.#method,
          undefined,
          error.message,
        );
      } else {
        throw new DataGrabError(this.#config.url, this.method);
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
