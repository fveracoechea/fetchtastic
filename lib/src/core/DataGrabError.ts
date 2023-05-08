import { StatusCodes } from '../utils';
import { HttpMethod } from './types';

export class DataGrabError extends Error {
  static readonly type = Symbol('DataGrabError');

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
    this.name = 'DataGrabError';
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
      this.json = await this.response.json();
    } catch {
      this.text = await this.response.text();
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
