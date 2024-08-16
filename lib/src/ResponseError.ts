import { HttpMethod } from './types.ts';
import { StatusCodes, isStatusCode } from './utility.ts';

/**
 * Represents an error that occurs during an HTTP request made with Fetchtastic.
 * It encapsulates information about the error,
 * including the request URL, status code, response details, and error message.
 *
 * @extends Error
 */
export class ResponseError extends Error {
  /**
   * Indicates the HTTP method used in the failed request.
   */
  method: HttpMethod;
  /**
   * Refers to the `Response` object received from the failed request.
   */
  response: Response;

  /**
   * Creates a new instance of the `HttpError` class.
   * @param {string} url - The URL of the failed request.
   * @param {HttpMethod} method - The HTTP method used in the failed request.
   * @param {Response} response - The `Response` object received from the failed request.
   * @param {string} [message] - A custom error message (optional)
   */
  constructor(response: Response, method: HttpMethod) {
    super();
    this.name = 'ResponseError';
    this.method = method;
    this.response = response;
    this.#setMessage();
  }

  /**
   * Sets the error message based on the context of the HTTP error.
   * @private
   */
  #setMessage() {
    this.message = 'Fetch Error';
    const statusText =
      isStatusCode(this.response.status) && StatusCodes[this.response.status];

    if (this.response.status > 0 && statusText) {
      this.message = statusText;
    } else if (this.response.type === 'opaque') {
      this.message = 'Opaque Response (no-cors)';
    } else if (this.response.type === 'error') {
      this.message = 'Network Error';
    }
  }
}
