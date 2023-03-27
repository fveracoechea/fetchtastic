import { HttpMethod } from './core';
import { StatusCodes } from './utils/status-codes';

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export interface XShieldError {
  _type: 'XShieldError';
  status: number;
  method: HttpMethod;
  response?: Response | undefined;
  url: string;
  message: string;
  text?: string;
  json?: unknown;
  errorRef?: Error | undefined;
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
  const message =
    StatusCodes.has(config.status) && StatusCodes.get(config.status);

  if (config.message) {
    return;
  } else if (config.status > 0 && message) {
    config.message = message;
  } else if (config?.response?.type === 'opaque') {
    config.message = 'Opaque Response (no-cors)';
  } else if (config?.response?.type === 'error') {
    config.message = 'Network Error';
  } else {
    config.message = 'Fetch Error';
  }
}

export function isXShieldError(error: unknown): error is XShieldError {
  if (error) {
    return (
      error != null &&
      typeof error === 'object' &&
      '_type' in error &&
      error._type === 'XShieldError' &&
      'url' in error &&
      typeof error.url === 'string' &&
      'status' in error &&
      typeof error?.status === 'number' &&
      'method' in error &&
      typeof error.method === 'string'
    );
  }
  return false;
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
  response?: Response | undefined,
) {
  const config: XShieldError = {
    _type: 'XShieldError',
    url,
    method,
    status: response?.status || 0,
    response,
    message: '',
    errorRef: new Error('XShieldError'),
  };
  parseResponseData(config);
  setMessage(config);
  return config;
}
