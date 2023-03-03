import { XShieldComposable, XShieldRequest } from '../core';
import { createError, isXShieldError } from '../error';

async function parse<T extends XShieldRequest>(
  request: T,
  response: Response,
): Promise<T['schema']> {
  let data: unknown;
  try {
    switch (request.parser) {
      case 'JSON':
        data = await response.json();
        break;
      case 'Text':
        data = await response.text();
        break;
      case 'ArrayBuffer':
        data = await response.arrayBuffer();
        break;
      case 'Blob':
        data = await response.blob();
        break;
      case 'FormData':
        data = await response.formData();
        break;
    }
    return request.schema.parse(data);
  } catch (error) {
    const xError = createError(response.url, request.method, response);
    xError.errorRef = error as Error;
    throw xError;
  }
}

export function send<T extends XShieldComposable>(
  composable: T,
): Promise<ReturnType<T>['schema']> {
  const instace = composable();

  const options: RequestInit = {
    headers: instace.headers,
    ...instace.options,
  };

  return fetch(instace.url.toString(), options)
    .then(response => {
      if (!response.ok) {
        const xError = createError(
          instace.url.toString(),
          instace.method,
          response,
        );
        const error = new Error(xError.message);
        xError.errorRef = error;
        throw xError;
      }
      return parse(instace, response);
    })
    .catch((error: Error) => {
      if (isXShieldError(error)) {
        throw error;
      } else {
        const xError = createError(instace.url.toString(), instace.method);
        xError.message = error.message;
        xError.errorRef = error;
        throw xError;
      }
    });
}
