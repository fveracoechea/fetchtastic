import { XShield } from '../core';
import { assertsXShield } from '../internals';

export function validateResponse<B>(validate: (data: unknown) => B) {
  return <A>(config: XShield<A>): XShield<B> => {
    assertsXShield(config);
    return {
      ...config,
      validateResponse: validate,
    };
  };
}
