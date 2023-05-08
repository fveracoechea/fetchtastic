import { ResponseParser } from '../core';

/**
 * Returns a parsing function of a given `Response`
 */
export const getResponseParser =
  (parser: ResponseParser) => (response: Response) => {
    const cases = {
      JSON: () => response.json(),
      Text: () => response.text(),
      ArrayBuffer: () => response.arrayBuffer(),
      Blob: () => response.blob(),
      FormData: () => response.formData(),
    };
    return cases[parser]();
  };
