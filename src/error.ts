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

async function parseResponseData(instance: XShieldError) {
  if (instance.status === 0 || !instance.response) return;
  try {
    instance.json = await instance.response.json();
  } catch {
    instance.text = await instance.response.text();
  }
}

function setMessage(instance: XShieldError) {
  if (instance.message) {
    return;
  } else if (instance.status > 0 && StatusCodes.has(instance.status)) {
    instance.message = StatusCodes.get(instance.status)!;
  } else if (instance?.response?.type === 'opaque') {
    instance.message = 'Opaque Response (no-cors)';
  } else if (instance?.response?.type === 'error') {
    instance.message = 'Network Error';
  } else {
    instance.message = 'Fetch Error';
  }
}

export function isXShieldError(error: any): error is XShieldError {
  return (
    error?._type === 'XShieldError' &&
    typeof error?.url === 'string' &&
    typeof error?.status === 'number'
  );
}

export function createError(
  url: string,
  method: HttpMethod,
  response?: Response,
) {
  const instance: XShieldError = {
    _type: 'XShieldError',
    url,
    method,
    status: response?.status || 0,
    response: response,
    message: '',
    errorRef: new Error('XShieldError'),
  };
  parseResponseData(instance);
  setMessage(instance);
  return instance;
}
