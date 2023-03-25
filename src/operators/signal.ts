import { XShield } from '../core';

export function signal(signal: AbortSignal | null) {
  return <T>(config: XShield<T>): XShield<T> => ({
    ...config,
    options: {
      ...config.options,
      signal,
    },
  });
}
