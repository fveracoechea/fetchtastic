import { XShield } from '../core';

export function validateResponse<B>(validate: (data: unknown) => B) {
  return <A>(config: XShield<A>): XShield<B> => {
    return {
      ...config,
      validateResponse: validate,
    };
  };
}
