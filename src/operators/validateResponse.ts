import { initialize, XShieldRequest } from '../core';

export function validateResponse<T>(validate: (data: unknown) => T) {
  return (request?: XShieldRequest): XShieldRequest<T> => {
    const instance = initialize(request);

    return {
      ...instance,
      validateResponse: validate,
    };
  };
}
