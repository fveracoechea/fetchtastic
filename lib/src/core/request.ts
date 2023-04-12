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

async function parse<Type>(config: XShield<Type>, response: Response) {
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

export async function request<Type>(
  config: XShield<Type>,
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
      const xError = createError(config.url.toString(), config.method, response);
      const error = new Error(xError.message);
      xError.errorRef = error;
      throw xError;
    }
    return await parse(config, response);
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
