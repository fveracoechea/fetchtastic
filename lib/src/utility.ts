import { HttpMethod, HttpMethods } from './types.ts';

/**
 * Type guard function, returns `true` if the given value is a valid `HttpMethod`
 */
export function isHttpMethod(value: unknown): value is HttpMethod {
  return typeof value === 'string' && HttpMethods.some(m => m === value.toUpperCase());
}

/**
 * HTTP status codes and their corresponding descriptions.
 * This object maps HTTP status code numbers to their standard textual descriptions.
 * Each key represents an HTTP status code, and its corresponding value is the description.
 * The keys are numeric values, and the values are strings.
 * For example:
 * {
 *   200: 'OK',
 *   404: 'Not Found',
 *   ...
 * }
 */
export const StatusCodes = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a Teapot",
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required',
} as const;

/**
 * Type guard function to check if the input is a valid HTTP status code.
 * @param key The input to check.
 * @returns A boolean indicating whether the input is a valid HTTP status code.
 * The input is considered valid if it is a number and exists as a key in the StatusCodes object.
 */
export function isStatusCode(key: unknown): key is keyof typeof StatusCodes {
  return typeof key === 'number' && key in StatusCodes;
}
