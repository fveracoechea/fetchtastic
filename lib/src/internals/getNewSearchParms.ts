import { SearchParamInput } from '../core/types.ts';

export function getNewSearchParms(data: SearchParamInput) {
  let result: string | string[][] | URLSearchParams;

  if (typeof data === 'string' || data instanceof URLSearchParams) {
    result = data;
  } else if (Array.isArray(data)) {
    result = [];
    for (const [key, value] of data) {
      result.push([key, String(value)]);
    }
  } else {
    result = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result.push([key, String(data[key])]);
      }
    }
  }

  return new URLSearchParams(result);
}
