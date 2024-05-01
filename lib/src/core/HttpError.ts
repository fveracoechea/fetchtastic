import { StatusCodes } from '../utils/statusCodes.ts';
import { HttpMethod } from './types.ts';

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

  #setMessage() {
    this.message = 'Fetch Error';
    const statusText = StatusCodes.get(this.status);
    if (this.status > 0 && statusText) {
      this.message = statusText;
    } else if (this.response.type === 'opaque') {
      this.message = 'Opaque Response (no-cors)';
    } else if (this.response.type === 'error') {
      this.message = 'Network Error';
    }
  }
}
