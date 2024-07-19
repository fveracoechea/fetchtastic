import { HttpMethod } from './types.ts';
import { StatusCodes, isStatusCode } from './utility.ts';

/**
 * Represents an error that occurs during an HTTP request made with Fetchtastic.
 * It encapsulates information about the error,
 * including the request URL, status code, response details, and error message.
 *
 * @extends Error
 */
export class HttpError extends Error {
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
  /**
   * Creates a new instance of the `HttpError` class.
   * @param {string} url - The URL of the failed request.
   * @param {HttpMethod} method - The HTTP method used in the failed request.
   * @param {Response} response - The `Response` object received from the failed request.
   * @param {string} [message] - A custom error message (optional)
   */
  constructor(url: string, method: HttpMethod, response: Response, message?: string) {
    super();
    this.name = 'HttpError';
    this.url = url;
    this.method = method;
    this.status = response.status || 0;
    this.response = response;
    if (message) this.message = message;
    else this.#setMessage();
  }

  /**
   * Sets the error message based on the context of the HTTP error.
   */
  #setMessage() {
    this.message = 'Fetch Error';
    const statusText = isStatusCode(this.status) && StatusCodes[this.status];
    if (this.status > 0 && statusText) {
      this.message = statusText;
    } else if (this.response.type === 'opaque') {
      this.message = 'Opaque Response (no-cors)';
    } else if (this.response.type === 'error') {
      this.message = 'Network Error';
    }
  }
}
