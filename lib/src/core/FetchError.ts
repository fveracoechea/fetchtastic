import { StatusCodes } from '../utils/statusCodes';
import { HttpMethod } from './types';

/**
 * Represents an error that occurs during an HTTP request made with Fetchtastic.
 * It encapsulates information about the error,
 * including the request URL, HTTP method, response details, and error message.
 *
 * @extends Error
 * @preserve
 */
export class FetchError extends Error {
  static readonly type = Symbol('FetchError');

  status: number;
  method: HttpMethod;
  response?: Response | undefined;
  url: string;
  text?: string;
  json?: unknown;

  constructor(
    url: string,
    method: HttpMethod,
    response?: Response,
    message?: string,
  ) {
    super();
    this.name = 'FetchError';
    this.url = url;
    this.method = method;
    this.status = response?.status || 0;
    this.response = response;
    this.#parseResponseData();
    this.#setMessage(message);
  }

  async #parseResponseData() {
    if (!this.response || this.status === 0) return;
    try {
      this.text = await this.response.text();
      this.json = JSON.parse(this.text);
    } catch {
      /* empty */
    }
  }

  #setMessage(message?: string) {
    const statusText = StatusCodes.get(this.status);
    if (message) {
      this.message = message;
    } else if (this.status > 0 && statusText) {
      this.message = statusText;
    } else if (this.response?.type === 'opaque') {
      this.message = 'Opaque Response (no-cors)';
    } else if (this.response?.type === 'error') {
      this.message = 'Network Error';
    } else {
      this.message = 'Fetch Error';
    }
  }
}
