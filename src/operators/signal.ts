import { initialize, XShieldRequest } from '../core';

export function signal(signal: AbortSignal | null) {
  return (request?: XShieldRequest): XShieldRequest => {
    const instance = initialize(request);

    return {
      ...instance,
      options: {
        ...instance.options,
        signal,
      },
    };
  };
}
