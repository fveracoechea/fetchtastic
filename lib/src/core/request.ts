import { HttpMethod, XShield } from './xshield';
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

async function parse<Type>(
  config: XShield<Type>,
  method: HttpMethod,
  response: Response,
) {
  try {
    const parse = getResponseParser(response, config.parser);
    const data = await parse();
    return config.validateResponse(data);
  } catch (error) {
    const xError = createError(response.url, method, response);
    xError.errorRef = error as Error;
    throw xError;
  }
}

export async function request<Type>(
  config: XShield<Type>,
  method: HttpMethod,
  body?: unknown | undefined,
) {
  const options: RequestInit = {
    method,
    headers: config.headers,
    body: body ? JSON.stringify(body) : null,
    ...config.options,
  };

  const endpoint = config.searchParams.toString()
    ? `${config.url.toString()}?${config.searchParams.toString()}`
    : config.url.toString();

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      const xError = createError(config.url.toString(), method, response);
      const error = new Error(xError.message);
      xError.errorRef = error;
      throw xError;
    }
    return await parse(config, method, response);
  } catch (error) {
    if (isXShieldError(error)) {
      throw error;
    } else {
      const xError = createError(config.url.toString(), method);
      xError.message = isError(error) ? error.message : 'Fetch Error';
      xError.errorRef = isError(error) ? error : undefined;
      throw xError;
    }
  }
}
