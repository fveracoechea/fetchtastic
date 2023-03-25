import { HttpMethod } from './core';
import { StatusCodes } from './status-codes';

export interface XShieldError {
  _type: 'XShieldError';
  status: number;
  method: HttpMethod;
  response?: Response;
  url: string;
  message: string;
  text?: string;
  json?: unknown;
  errorRef?: Error;
}

async function parseResponseData(config: XShieldError) {
  if (config.status === 0 || !config.response) return;
  try {
    config.json = await config.response.json();
  } catch {
    config.text = await config.response.text();
  }
}

function setMessage(config: XShieldError) {
  if (config.message) {
    return;
  } else if (config.status > 0 && StatusCodes.has(config.status)) {
    config.message = StatusCodes.get(config.status)!;
  } else if (config?.response?.type === 'opaque') {
    config.message = 'Opaque Response (no-cors)';
  } else if (config?.response?.type === 'error') {
    config.message = 'Network Error';
  } else {
    config.message = 'Fetch Error';
  }
}

export function isXShieldError(error: unknown): error is XShieldError {
  if (!error) return false;
  return (
    typeof error === 'object' &&
    '_type' in error &&
    error._type === 'XShieldError' &&
    'url' in error &&
    typeof error.url === 'string' &&
    'status' in error &&
    typeof error?.status === 'number' &&
    'method' in error &&
    typeof error.method === 'number'
  );
}

export function assertXShieldError(
  error: unknown,
): asserts error is XShieldError {
  if (!isXShieldError(error)) {
    throw new Error('Given error does not satisfy XShieldError type');
  }
}

export function createError(
  url: string,
  method: HttpMethod,
  response?: Response,
) {
  const config: XShieldError = {
    _type: 'XShieldError',
    url,
    method,
    status: response?.status || 0,
    response: response,
    message: '',
    errorRef: new Error('XShieldError'),
  };
  parseResponseData(config);
  setMessage(config);
  return config;
}
