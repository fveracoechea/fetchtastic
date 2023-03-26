import { HttpMethod, XShield } from '../core';
import { createError, isError, isXShieldError } from '../error';

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

export async function sendRequest<Type, Config extends XShield<Type>>(
  config: Config,
  method: HttpMethod,
  body?: unknown | undefined,
) {
  const requestBody = body ? { body: JSON.stringify(body) } : {};
  const options: RequestInit = {
    method,
    headers: config.headers,
    ...requestBody,
    ...config.options,
  };

  try {
    const response = await fetch(config.url.toString(), options);
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
    return await parse<Type, Config>(config, response);
  } catch (error) {
    if (isXShieldError(error)) {
      throw error;
    } else {
      const xError = createError(config.url.toString(), config.method);
      xError.message = isError(error) ? error.message : 'Fetch Error';
      xError.errorRef = isError(error) ? error : undefined;
      throw xError;
    }
  }
}
