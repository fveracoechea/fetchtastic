import { XShield } from '../core';
import { assertsXShield } from '../internals';

// INPUT TYPE

export type SearchParamInput =
  | string
  | URLSearchParams
  | [string, string | boolean | number][]
  | Record<string, string | boolean | number>;

// INTERNALS

function getNewSearchParms(data: SearchParamInput) {
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

// OVERLOADS

export function searchParams(): <T>(config: XShield<T>) => XShield<T>;

export function searchParams(
  data: SearchParamInput,
  replace?: boolean,
): <T>(config: XShield<T>) => XShield<T>;

export function searchParams(data?: SearchParamInput, replace = false) {
  return <T>(config: XShield<T>): XShield<T> => {
    assertsXShield(config);
    if (!data) {
      return {
        ...config,
        searchParams: new URLSearchParams(),
      };
    }

    const newSearchParams = getNewSearchParms(data);

    if (replace) {
      return {
        ...config,
        searchParams: newSearchParams,
      };
    }

    config.searchParams.forEach((value, key) => {
      if (!newSearchParams.has(key)) {
        newSearchParams.set(key, value);
      }
    });

    return { ...config, searchParams: newSearchParams };
  };
}
