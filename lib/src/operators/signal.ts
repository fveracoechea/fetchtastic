import { XShield } from '../core';
import { assertsXShield } from '../internals';

export function signal(signal: AbortSignal | null) {
  return <T>(config: XShield<T>): XShield<T> => {
    assertsXShield(config);
    return {
      ...config,
      options: {
        ...config.options,
        signal,
      },
    };
  };
}
