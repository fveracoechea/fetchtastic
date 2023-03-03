import { initialize, XShieldRequest } from '../core';

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

export function searchParams(): (request?: XShieldRequest) => XShieldRequest;

export function searchParams(
  data: SearchParamInput,
  replace?: boolean,
): (request?: XShieldRequest) => XShieldRequest;

export function searchParams(data?: SearchParamInput, replace = false) {
  return (request?: XShieldRequest) => {
    const instance = initialize(request);

    if (!data) {
      return {
        ...instance,
        searchParams: new URLSearchParams(),
      };
    }

    const newSearchParams = getNewSearchParms(data);

    if (replace) {
      return {
        ...instance,
        searchParams: newSearchParams,
      };
    }

    instance.searchParams.forEach((value, key) => {
      if (!newSearchParams.has(key)) {
        newSearchParams.set(key, value);
      }
    });

    return { ...instance, searchParams: newSearchParams };
  };
}
