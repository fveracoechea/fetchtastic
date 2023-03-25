import { XShield } from '../core';
import { createError, isXShieldError } from '../error';

type ParseOptions = Record<XShield['parser'], () => Promise<unknown>>;

function getResponseParser(response: Response, parser: XShield['parser']) {
  const cases: ParseOptions = {
    JSON: () => response.json(),
    Text: () => response.text(),
    ArrayBuffer: () => response.arrayBuffer(),
    Blob: () => response.blob(),
    FormData: () => response.formData(),
  };
  return cases[parser];
}

async function parse<Type, Config extends XShield<Type>>(
  config: Config,
  response: Response,
) {
  try {
    const parse = getResponseParser(response, config.parser);
    const data = await parse();
    return config.validateResponse(data);
  } catch (error) {
    const xError = createError(response.url, config.method, response);
    xError.errorRef = error as Error;
    throw xError;
  }
}

export function send<Type, Config extends XShield<Type>>(config: Config) {
  const options: RequestInit = {
    headers: config.headers,
    ...config.options,
  };

  return fetch(config.url.toString(), options)
    .then(response => {
      if (!response.ok) {
        const xError = createError(
          config.url.toString(),
          config.method,
          response,
        );
        const error = new Error(xError.message);
        xError.errorRef = error;
        throw xError;
      }
      return parse<Type, Config>(config, response);
    })
    .catch((error: Error) => {
      if (isXShieldError(error)) {
        throw error;
      } else {
        const xError = createError(config.url.toString(), config.method);
        xError.message = error.message;
        xError.errorRef = error;
        throw xError;
      }
    });
}
